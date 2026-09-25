import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import Message from '../models/Message.js';
import { createMessage } from '../controllers/messageController.js';
import { connectDB } from '../config/db.js';
import { errorHandler } from '../middleware/errorHandler.js';

function response() { return { statusCode: 200, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } }; }

test('contact rejects non-string inputs and invalid lengths', async () => {
  for (const body of [null, {}, { name: 42, email: 'a@b.co', message: 'A valid message' }, { name: 'A', email: [], message: 'A valid message' }, { name: 'A', email: 'a@b.co', message: {} }, { name: 'A', email: 'invalid', message: 'A valid message' }, { name: 'A', email: 'a@b.co', message: 'short' }]) {
    const res = response();
    await createMessage({ body }, res, (error) => { throw error; });
    assert.equal(res.statusCode, 400);
  }
});

test('contact stores normalized fields only', async (t) => {
  t.mock.method(Message, 'create', async (payload) => {
    assert.deepEqual(payload, { name: 'Visitor', email: 'a@b.co', message: 'A valid message' });
    return { _id: 'message-id' };
  });
  const res = response();
  await createMessage({ body: { name: ' Visitor ', email: ' A@B.CO ', message: ' A valid message ', read: true } }, res, (error) => { throw error; });
  assert.equal(res.statusCode, 201);
});

test('database retries after a completed connection disconnects', async (t) => {
  const old = process.env.MONGODB_URI;
  process.env.MONGODB_URI = 'mongodb://test.invalid/test';
  t.after(() => { if (old === undefined) delete process.env.MONGODB_URI; else process.env.MONGODB_URI = old; });
  let attempts = 0;
  t.mock.method(mongoose, 'connect', async () => { attempts++; return { connection: { host: 'mock' } }; });
  await Promise.all([connectDB(), connectDB()]);
  assert.equal(attempts, 1);
  await connectDB();
  assert.equal(attempts, 2);
});

test('server errors do not expose internal details', (t) => {
  t.mock.method(console, 'error', () => {});
  const res = response();
  errorHandler(new Error('private connection details'), {}, res, () => {});
  assert.equal(res.statusCode, 500);
  assert.equal(res.body.message, 'Internal server error');
});

test('health, missing routes and malformed JSON respond without a database', async (t) => {
  process.env.NODE_ENV = 'test';
  t.mock.method(mongoose, "connect", async () => { throw new Error("Unexpected database connection"); });
  const { default: app } = await import('../server.js');
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port;
  assert.equal((await fetch(base + '/api/health')).status, 200);
  assert.equal((await fetch(base + '/missing')).status, 404);
  assert.equal((await fetch(base + '/api/messages')).status, 404);
  assert.equal((await fetch(base + '/api/projects', { method: 'DELETE' })).status, 404);
  assert.equal((await fetch(base + '/api/stats/missing')).status, 404);
  const res = await fetch(base + '/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{broken' });
  assert.equal(res.status, 400);
  assert.equal((await res.json()).message, "Invalid JSON request body");
  assert.equal(mongoose.connect.mock.callCount(), 0);
});
