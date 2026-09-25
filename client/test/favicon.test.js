import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (name) => readFileSync(new URL("../public/" + name, import.meta.url));
test("favicon is self-contained and raster icon dimensions match their declarations", () => {
  const svg = read("favicon.svg").toString();
  assert.match(svg, /href="data:image\/png;base64,/);
  assert.doesNotMatch(svg, /href="(?:https?:|\/)/);
  for (const [name, size] of [["favicon-32.png", 32], ["favicon-192.png", 192], ["apple-touch-icon.png", 180]]) {
    const png = read(name);
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  const ico = read("favicon.ico");
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 1);
  assert.equal(ico.readUInt32LE(18), 22);
  assert.equal(ico.readUInt32LE(14), ico.length - 22);
});
