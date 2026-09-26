/**
 * Checks self-contained SVG, PNG dimensions and ICO header/payload. Binary offsets follow PNG IHDR/ICO layout. These are structural checks; inspect regenerated icon appearance separately.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import test from node:test; use its public API here rather than modifying installed dependency files. */
import test from "node:test";
/* Import assert from node:assert/strict; use its public API here rather than modifying installed dependency files. */
import assert from "node:assert/strict";
/* Import readFileSync from node:fs; use its public API here rather than modifying installed dependency files. */
import { readFileSync } from "node:fs";
/* Asset reader relative to the test module, independent of shell working directory. */
const read = (name) => readFileSync(new URL("../public/" + name, import.meta.url));
/* Regression case: favicon is self-contained and raster icon dimensions match their declarations. Extend cases when changing this behavior. */
test("favicon is self-contained and raster icon dimensions match their declarations", () => {
  /* Read SVG text for asset structure checks; do not change vendor artwork merely to satisfy a test. */
  const svg = read("favicon.svg").toString();
  /* Check assert.match(svg, /href="data:image\/png;base64,/);. Inspect the tested behavior before changing this expected result. */
  assert.match(svg, /href="data:image\/png;base64,/);
  /* Check assert.doesNotMatch(svg, /href="(?:https?:|\/)/);. Inspect the tested behavior before changing this expected result. */
  assert.doesNotMatch(svg, /href="(?:https?:|\/)/);
  /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
  for (const [name, size] of [["favicon-32.png", 32], ["favicon-192.png", 192], ["apple-touch-icon.png", 180]]) {
    /* PNG bytes; IHDR offsets 16/20 contain width/height. */
    const png = read(name);
    /* Check assert.equal(png.readUInt32BE(16), size);. Inspect the tested behavior before changing this expected result. */
    assert.equal(png.readUInt32BE(16), size);
    /* Check assert.equal(png.readUInt32BE(20), size);. Inspect the tested behavior before changing this expected result. */
    assert.equal(png.readUInt32BE(20), size);
  }
  /* ICO bytes; directory offsets below describe one PNG payload. */
  const ico = read("favicon.ico");
  /* Check assert.equal(ico.readUInt16LE(2), 1);. Inspect the tested behavior before changing this expected result. */
  assert.equal(ico.readUInt16LE(2), 1);
  /* Check assert.equal(ico.readUInt16LE(4), 1);. Inspect the tested behavior before changing this expected result. */
  assert.equal(ico.readUInt16LE(4), 1);
  /* Check assert.equal(ico.readUInt32LE(18), 22);. Inspect the tested behavior before changing this expected result. */
  assert.equal(ico.readUInt32LE(18), 22);
  /* Check assert.equal(ico.readUInt32LE(14), ico.length - 22);. Inspect the tested behavior before changing this expected result. */
  assert.equal(ico.readUInt32LE(14), ico.length - 22);
});
