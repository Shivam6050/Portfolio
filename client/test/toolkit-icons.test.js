/* Toolkit asset regression check: require exactly one representation per key and inspect brand SVG files for forbidden embedded active elements. This is not a general SVG sanitizer. */
/* Import test from node:test; use its public API here rather than modifying installed dependency files. */
import test from "node:test";
/* Import assert from node:assert/strict; use its public API here rather than modifying installed dependency files. */
import assert from "node:assert/strict";
/* Import readFileSync from node:fs; use its public API here rather than modifying installed dependency files. */
import { readFileSync } from "node:fs";
/* Import STACK_GROUPS from ../src/data/constants.js; edit that module for the shared implementation. */
import { STACK_GROUPS } from "../src/data/constants.js";
/* Import TOOLKIT_BRANDS, TOOLKIT_SYMBOLS from ../src/data/toolkitIcons.js; edit that module for the shared implementation. */
import { TOOLKIT_BRANDS, TOOLKIT_SYMBOLS } from "../src/data/toolkitIcons.js";

/* Regression case: every toolkit label has exactly one local brand logo or neutral concept symbol. Extend cases when changing this behavior. */
test("every toolkit label has exactly one local brand logo or neutral concept symbol", () => {
  /* Iterate using these bounds; synchronize indices/counts with the source collection or buffer allocation. */
  for (const [name, label] of STACK_GROUPS.flatMap(group => group.items)) {
    /* Check assert.equal(Number(Boolean(TOOLKIT_BRANDS[name])) + Number(Boolean(TOOLKIT_SYMBOLS[name])), 1, label);. Inspect the tested behavior before changing this expected result. */
    assert.equal(Number(Boolean(TOOLKIT_BRANDS[name])) + Number(Boolean(TOOLKIT_SYMBOLS[name])), 1, label);
    /* Guard: TOOLKIT_BRANDS[name]. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (TOOLKIT_BRANDS[name]) {
      /* Read SVG text for asset structure checks; do not change vendor artwork merely to satisfy a test. */
      const svg = readFileSync(new URL("../public/assets/toolkit/" + TOOLKIT_BRANDS[name] + ".svg", import.meta.url), "utf8");
      /* Check assert.match(svg, /<svg[\s>]/, label);. Inspect the tested behavior before changing this expected result. */
      assert.match(svg, /<svg[\s>]/, label);
      /* Check assert.doesNotMatch(svg, /<script|<foreignObject/i, label);. Inspect the tested behavior before changing this expected result. */
      assert.doesNotMatch(svg, /<script|<foreignObject/i, label);
    }
  }
});
