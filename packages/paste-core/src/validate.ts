import type { ValidateFn, ValidateResult } from "./types";

export function inMemorySetValidator(allowed: Set<string>): ValidateFn {
  return async (values: string[]): Promise<ValidateResult> => {
    const valid: string[] = [];
    const invalid: string[] = [];
    for (const v of values) (allowed.has(v) ? valid : invalid).push(v);
    return { valid, invalid };
  };
}

export function batchedValidator(
  fetchFn: (batch: string[]) => Promise<ValidateResult>,
  batchSize = 500,
  signal?: AbortSignal
): ValidateFn {
  return async (values: string[]) => {
    const v: string[] = [];
    const iv: string[] = [];
    for (let i = 0; i < values.length; i += batchSize) {
      if (signal?.aborted) throw new Error("Validation aborted");
      const batch = values.slice(i, i + batchSize);
      const res = await fetchFn(batch);
      v.push(...res.valid);
      iv.push(...res.invalid);
    }
    return { valid: v, invalid: iv };
  };
}
