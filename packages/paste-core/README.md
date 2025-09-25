# @pastebox/paste-core

Headless parsing + validation for bulk paste (10k+) with dedupe and batching.

## Install
```bash
pnpm i @pastebox/paste-core
```

## Usage

```ts
import { parse, inMemorySetValidator } from "@pastebox/paste-core";

const text = "A123,B456\nC789, A123";
const res = parse(text, { delimiters: [",","\n","\t",";"], maxValues: 10000 });
console.log(res.uniques); // ["A123","B456","C789"]
```

Validation:

```ts
const validate = inMemorySetValidator(new Set(["A123","C789"]));
const v = await validate(res.uniques); // { valid:["A123","C789"], invalid:["B456"] }
```

## API

### `parse(input: string, options?: ParseOptions): ParseResult`

Parses pasted input into normalized, unique, and duplicate arrays.

**Options:**
- `delimiters?: string[]` - Characters to split on (default: `[",", "\n", "\t", ";"]`)
- `normalize?: (v: string) => string` - Function to normalize values (default: `v => v.trim()`)
- `caseSensitive?: boolean` - Whether duplicates are case-sensitive (default: `true`)
- `maxValues?: number` - Maximum values to process (default: `10000`)

**Returns:**
- `all: string[]` - All parsed values (limited by maxValues)
- `normalized: string[]` - All values after normalization
- `uniques: string[]` - Unique values only
- `duplicates: string[]` - Values that appeared more than once

### Validators

#### `inMemorySetValidator(allowed: Set<string>): ValidateFn`

Creates a validator that checks values against an in-memory Set.

#### `batchedValidator(fetchFn, batchSize?, signal?): ValidateFn`

Creates a validator that processes values in batches, useful for API validation.

## License

MIT
