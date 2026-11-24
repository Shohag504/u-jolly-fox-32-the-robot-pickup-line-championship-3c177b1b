// The Robot Pickup Line Championship.
// One pickup line in the voice of a robot trying to charm someone.
// Writes it to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I don't have a heart, but my cooling fan spins faster every time you come near.";

// Mirror the sealed gate scorer: 1-200 chars, single line, not only whitespace.
// Fail loudly instead of writing an entry the gate would refuse.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (!/\S/.test(line)) {
    throw new Error("line must not be only whitespace");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
