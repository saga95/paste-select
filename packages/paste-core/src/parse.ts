import type { ParseOptions, ParseResult } from "./types";

const DEFAULT_DELIMS = [",", "\n", "\t", ";"];

export function parse(input: string, opts: ParseOptions = {}): ParseResult {
  const {
    delimiters = DEFAULT_DELIMS,
    normalize = (v: string) => v.trim(),
    caseSensitive = true,
    maxValues = 10000
  } = opts;

  if (!input?.trim()) {
    return { all: [], normalized: [], uniques: [], duplicates: [] };
  }

  // Split by any delimiter (escape special regex chars)
  const re = new RegExp(`[${delimiters.map(d => `\\${d}`).join("")}]`, "g");
  const raw = input.split(re).map(normalize).filter(Boolean);

  const limited = raw.slice(0, maxValues);
  const seen = new Map<string, number>();
  const normalized: string[] = [];
  const uniques: string[] = [];
  const duplicates: string[] = [];

  for (const v of limited) {
    const key = caseSensitive ? v : v.toLowerCase();
    normalized.push(v);
    const count = (seen.get(key) ?? 0) + 1;
    seen.set(key, count);
  }

  for (const [key, count] of seen.entries()) {
    const orig = key; // key is already case-adjusted
    if (count === 1) uniques.push(orig);
    else duplicates.push(orig);
  }

  return {
    all: limited,
    normalized,
    uniques,
    duplicates
  };
}
