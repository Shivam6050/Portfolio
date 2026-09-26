/**
 * Validation/normalization/reconnect/error-privacy/routing tests. Model/connection calls are mocked; HTTP checks listen on an ephemeral loopback port. These do not verify live MongoDB persistence.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import test from node:test; use its public API here rather than modifying installed dependency files. */
import test from 'node:test';
/* Import assert from node:assert/strict; use its public API here rather than modifying installed dependency files. */
import assert from 'node:assert/strict';
/* Import mongoose from mongoose; use its public API here rather than modifying installed dependency files. */
import mongoose from 'mongoose';
/* Import Message from ../models/Message.js; edit that module for the shared implementation. */
import Message from '../models/Message.js';
/* Import createMessage from ../controllers/messageController.js; edit that module for the shared implementation. */
import { createMessage } from '../controllers/messageController.js';
/* Import connectDB from ../config/db.js; edit that module for the shared implementation. */
import { connectDB } from '../config/db.js';
/* Import errorHandler from ../middleware/errorHandler.js; edit that module for the shared implementation. */
import { errorHandler } from '../middleware/errorHandler.js';

/* Chainable Express-like test recorder: status/json save values for subsequent assertions. */
function response() { return { statusCode: 200, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } }; }

/* Regression case: contact rejects non-string inputs and invalid lengths. Extend cases when changing this behavior. */
test('contact rejects non-string inputs and invalid lengths', async () => {
  /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
  for (const body of [null, {}, { name: 42, email: 'a@b.co', message: 'A valid message' }, { name: 'A', email: [], message: 'A valid message' }, { name: 'A', email: 'a@b.co', message: {} }, { name: 'A', email: 'invalid', message: 'A valid message' }, { name: 'A', email: 'a@b.co', message: 'short' }]) {
    /* Response object/recorder for this test step; assertions inspect status and decoded JSON. */
    const res = response();
    /* Run contact validation/storage with the test request and response recorder; unexpected middleware errors fail the test. */
    await createMessage({ body }, res, (error) => { throw error; });
    /* Check assert.equal(res.statusCode, 400);. Inspect the tested behavior before changing this expected result. */
    assert.equal(res.statusCode, 400);
  }
});

/* Regression case: contact stores normalized fields only. Extend cases when changing this behavior. */
test('contact stores normalized fields only', async (t) => {
  /* Check t.mock.method(Message, 'create', async (payload) => { assert.deepEqual(payload, { name: 'Visitor', email: 'a@b. Inspect the tested behavior before changing this expected result. */
  t.mock.method(Message, 'create', async (payload) => {
    /* Check assert.deepEqual(payload, { name: 'Visitor', email: 'a@b.co', message: 'A valid message' });. Inspect the tested behavior before changing this expected result. */
    assert.deepEqual(payload, { name: 'Visitor', email: 'a@b.co', message: 'A valid message' });
    /* Return { _id: 'message-id' }; this ends the current function path. */
    return { _id: 'message-id' };
  });
  /* Response object/recorder for this test step; assertions inspect status and decoded JSON. */
  const res = response();
  /* Run contact validation/storage with the test request and response recorder; unexpected middleware errors fail the test. */
  await createMessage({ body: { name: ' Visitor ', email: ' A@B.CO ', message: ' A valid message ', read: true } }, res, (error) => { throw error; });
  /* Check assert.equal(res.statusCode, 201);. Inspect the tested behavior before changing this expected result. */
  assert.equal(res.statusCode, 201);
});

/* Regression case: database retries after a completed connection disconnects. Extend cases when changing this behavior. */
test('database retries after a completed connection disconnects', async (t) => {
  /* Previous environment value saved for test cleanup. */
  const old = process.env.MONGODB_URI;
  /* Use a non-production test URI while mongoose.connect is mocked; cleanup restores the previous environment value. */
  process.env.MONGODB_URI = 'mongodb://test.invalid/test';
  /* Register cleanup so environment/listeners are restored even after failed assertions. */
  t.after(() => { if (old === undefined) delete process.env.MONGODB_URI; else process.env.MONGODB_URI = old; });
  /* Mock connection-call counter used to verify shared attempts and later retries. */
  let attempts = 0;
  /* Replace this dependency for the test; avoid real external calls. The runner restores the mock afterward. */
  t.mock.method(mongoose, 'connect', async () => { attempts++; return { connection: { host: 'mock' } }; });
  /* Issue concurrent connection requests; the following assertion checks that only one connection attempt is made. */
  await Promise.all([connectDB(), connectDB()]);
  /* Check assert.equal(attempts, 1);. Inspect the tested behavior before changing this expected result. */
  assert.equal(attempts, 1);
  /* Await the shared connection; surrounding error handling owns any connection failure. */
  await connectDB();
  /* Check assert.equal(attempts, 2);. Inspect the tested behavior before changing this expected result. */
  assert.equal(attempts, 2);
});

/* Regression case: server errors do not expose internal details. Extend cases when changing this behavior. */
test('server errors do not expose internal details', (t) => {
  /* Replace this dependency for the test; avoid real external calls. The runner restores the mock afterward. */
  t.mock.method(console, 'error', () => {});
  /* Response object/recorder for this test step; assertions inspect status and decoded JSON. */
  const res = response();
  /* Exercise generic-error handling with deliberately private text; assertions verify that the client never receives it. */
  errorHandler(new Error('private connection details'), {}, res, () => {});
  /* Check assert.equal(res.statusCode, 500);. Inspect the tested behavior before changing this expected result. */
  assert.equal(res.statusCode, 500);
  /* Check assert.equal(res.body.message, 'Internal server error');. Inspect the tested behavior before changing this expected result. */
  assert.equal(res.body.message, 'Internal server error');
});

/* Regression case: health, missing routes and malformed JSON respond without a database. Extend cases when changing this behavior. */
test('health, missing routes and malformed JSON respond without a database', async (t) => {
  /* Disable automatic server listening before importing the app so this test controls its own ephemeral listener. */
  process.env.NODE_ENV = 'test';
  /* Replace this dependency for the test; avoid real external calls. The runner restores the mock afterward. */
  t.mock.method(mongoose, "connect", async () => { throw new Error("Unexpected database connection"); });
  /* Import the Express app after NODE_ENV=test so importing does not start its automatic listener. */
  const { default: app } = await import('../server.js');
  /* Ephemeral loopback HTTP listener; t.after closes it so tests can exit. */
  const server = app.listen(0, '127.0.0.1');
  /* Wait until the test listener is ready before issuing HTTP requests. */
  await new Promise(resolve => server.once('listening', resolve));
  /* Register cleanup so environment/listeners are restored even after failed assertions. */
  t.after(() => new Promise(resolve => server.close(resolve)));
  /* HTTP origin built from the assigned test port; this points to localhost, not production. */
  const base = 'http://127.0.0.1:' + server.address().port;
  /* Check assert.equal((await fetch(base + '/api/health')).status, 200);. Inspect the tested behavior before changing this expected result. */
  assert.equal((await fetch(base + '/api/health')).status, 200);
  /* Check assert.equal((await fetch(base + '/missing')).status, 404);. Inspect the tested behavior before changing this expected result. */
  assert.equal((await fetch(base + '/missing')).status, 404);
  /* Check assert.equal((await fetch(base + '/api/messages')).status, 404);. Inspect the tested behavior before changing this expected result. */
  assert.equal((await fetch(base + '/api/messages')).status, 404);
  /* Check assert.equal((await fetch(base + '/api/projects', { method: 'DELETE' })).status, 404);. Inspect the tested behavior before changing this expected result. */
  assert.equal((await fetch(base + '/api/projects', { method: 'DELETE' })).status, 404);
  /* Check assert.equal((await fetch(base + '/api/stats/missing')).status, 404);. Inspect the tested behavior before changing this expected result. */
  assert.equal((await fetch(base + '/api/stats/missing')).status, 404);
  /* Response object/recorder for this test step; assertions inspect status and decoded JSON. */
  const res = await fetch(base + '/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken' });
  /* Check assert.equal(res.status, 400);. Inspect the tested behavior before changing this expected result. */
  assert.equal(res.status, 400);
  /* Check assert.equal((await res.json()).message, "Invalid JSON request body");. Inspect the tested behavior before changing this expected result. */
  assert.equal((await res.json()).message, "Invalid JSON request body");
  /* Check assert.equal(mongoose.connect.mock.callCount(), 0);. Inspect the tested behavior before changing this expected result. */
  assert.equal(mongoose.connect.mock.callCount(), 0);
});
