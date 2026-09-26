/**
 * Fetch-wrapper tests use mocks, not a real backend. Cover HTTP/JSON envelopes and outgoing requests when changing client.js; t.mock restores dependencies after each case.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import test from node:test; use its public API here rather than modifying installed dependency files. */
import test from 'node:test';
/* Import assert from node:assert/strict; use its public API here rather than modifying installed dependency files. */
import assert from 'node:assert/strict';
/* Import api from ../src/api/client.js; edit that module for the shared implementation. */
import { api } from '../src/api/client.js';

/* Regression case: API rejects HTML and unsuccessful payloads instead of reporting a sent message. Extend cases when changing this behavior. */
test('API rejects HTML and unsuccessful payloads instead of reporting a sent message', async (t) => {
  /* Replace this dependency for the test; avoid real external calls. The runner restores the mock afterward. */
  t.mock.method(globalThis, 'fetch', async () => new Response('<html>fallback</html>'));
  /* Check await assert.rejects(api.sendMessage({}), /invalid response/);. Inspect the tested behavior before changing this expected result. */
  await assert.rejects(api.sendMessage({}), /invalid response/);
  /* Replace fetch with this unsuccessful response fixture; api.sendMessage must reject it rather than show false success. */
  globalThis.fetch = async () => Response.json({});
  /* Check await assert.rejects(api.sendMessage({}), /Request failed/);. Inspect the tested behavior before changing this expected result. */
  await assert.rejects(api.sendMessage({}), /Request failed/);
  /* Replace fetch with this unsuccessful response fixture; api.sendMessage must reject it rather than show false success. */
  globalThis.fetch = async () => Response.json({ success: false, message: 'Try later' }, { status: 429 });
  /* Check await assert.rejects(api.sendMessage({}), /Try later/);. Inspect the tested behavior before changing this expected result. */
  await assert.rejects(api.sendMessage({}), /Try later/);
});

/* Regression case: API sends JSON and accepts a confirmed submission. Extend cases when changing this behavior. */
test('API sends JSON and accepts a confirmed submission', async (t) => {
  /* Check t.mock.method(globalThis, 'fetch', async (url, options) => { assert.equal(url, '/api/messages'); assert.equal(. Inspect the tested behavior before changing this expected result. */
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    /* Check assert.equal(url, '/api/messages');. Inspect the tested behavior before changing this expected result. */
    assert.equal(url, '/api/messages');
    /* Check assert.equal(options.method, 'POST');. Inspect the tested behavior before changing this expected result. */
    assert.equal(options.method, 'POST');
    /* Check assert.equal(options.headers['Content-Type'], 'application/json');. Inspect the tested behavior before changing this expected result. */
    assert.equal(options.headers['Content-Type'], 'application/json');
    /* Check assert.deepEqual(JSON.parse(options.body), { name: 'Visitor' });. Inspect the tested behavior before changing this expected result. */
    assert.deepEqual(JSON.parse(options.body), { name: 'Visitor' });
    /* Check assert.ok(options.signal instanceof AbortSignal);. Inspect the tested behavior before changing this expected result. */
    assert.ok(options.signal instanceof AbortSignal);
    /* Return Response.json({ success: true }, { status: 201 }); this ends the current function path. */
    return Response.json({ success: true }, { status: 201 });
  });
  /* Check assert.equal((await api.sendMessage({ name: 'Visitor' })).success, true);. Inspect the tested behavior before changing this expected result. */
  assert.equal((await api.sendMessage({ name: 'Visitor' })).success, true);
});
