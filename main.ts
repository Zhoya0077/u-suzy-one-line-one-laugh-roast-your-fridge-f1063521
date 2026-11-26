import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, one laugh: roast your fridge.
// Premise: the fridge hums all night like a hard-working tenant.
// Twist: the only thing it has ever kept fresh is a jar of pickles
// older than my last relationship.
const ENTRY =
  "My fridge hums all night like it pays rent, but the only thing it's ever kept fresh is a jar of pickles older than my last relationship.";

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1 to 200 characters, not only white space, as a single line about
// a fridge or a phone. Fail loudly here instead of shipping a bad file.
function validateEntry(text: string): void {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("entry is empty or whitespace-only");
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} characters; must be 1-200`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!/fridge|phone/i.test(text)) {
    throw new Error("entry must roast a fridge or a phone");
  }
}

validateEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
