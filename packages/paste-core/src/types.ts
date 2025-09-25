export type ParseOptions = {
  delimiters?: string[];
  normalize?: (v: string) => string;
  caseSensitive?: boolean;
  maxValues?: number;
};

export type ParseResult = {
  all: string[];
  normalized: string[];
  uniques: string[];
  duplicates: string[];
};

export type ValidateResult = {
  valid: string[];
  invalid: string[];
};

export type ValidateFn = (values: string[]) => Promise<ValidateResult>;
