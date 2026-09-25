import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { STACK_GROUPS } from "../src/data/constants.js";
import { TOOLKIT_BRANDS, TOOLKIT_SYMBOLS } from "../src/data/toolkitIcons.js";

test("every toolkit label has exactly one local brand logo or neutral concept symbol", () => {
  for (const [name, label] of STACK_GROUPS.flatMap(group => group.items)) {
    assert.equal(Number(Boolean(TOOLKIT_BRANDS[name])) + Number(Boolean(TOOLKIT_SYMBOLS[name])), 1, label);
    if (TOOLKIT_BRANDS[name]) {
      const svg = readFileSync(new URL("../public/assets/toolkit/" + TOOLKIT_BRANDS[name] + ".svg", import.meta.url), "utf8");
      assert.match(svg, /<svg[\s>]/, label);
      assert.doesNotMatch(svg, /<script|<foreignObject/i, label);
    }
  }
});
