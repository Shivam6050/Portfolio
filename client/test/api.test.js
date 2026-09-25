import test from 'node:test';
import assert from 'node:assert/strict';
import { api } from '../src/api/client.js';

test('API rejects HTML and unsuccessful payloads instead of reporting a sent message', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('<html>fallback</html>'));
  await assert.rejects(api.sendMessage({}), /invalid response/);
  globalThis.fetch = async () => Response.json({});
  await assert.rejects(api.sendMessage({}), /Request failed/);
  globalThis.fetch = async () => Response.json({ success: false, message: 'Try later' }, { status: 429 });
  await assert.rejects(api.sendMessage({}), /Try later/);
});

test('API sends JSON and accepts a confirmed submission', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, '/api/messages');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(options.body), { name: 'Visitor' });
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ success: true }, { status: 201 });
  });
  assert.equal((await api.sendMessage({ name: 'Visitor' })).success, true);
});
