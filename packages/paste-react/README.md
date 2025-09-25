# @pastebox/paste-react

React component for bulk paste parsing/validation with visual feedback and lists.

## Install
```bash
pnpm i @pastebox/paste-react @pastebox/paste-core
```

## Quick start

```tsx
import { PasteSelect } from "@pastebox/paste-react";
import { inMemorySetValidator } from "@pastebox/paste-core";

const allowedValues = new Set(["A123", "B456", "C789"]);

function MyComponent() {
  return (
    <PasteSelect 
      validate={inMemorySetValidator(allowedValues)}
      onChange={(result) => {
        console.log(`${result.validate.valid.length} valid items`);
      }}
    />
  );
}
```

## Props

- `validate: ValidateFn` (**required**) - Function that validates an array of values
- `delimiters?: string[]` - Characters to split pasted text on (default: `[",", "\n", "\t", ";"]`)
- `normalize?: (v: string) => string` - Function to normalize values (default: `v => v.trim()`)
- `maxValues?: number` - Maximum values to process (default: `10000`)
- `caseSensitive?: boolean` - Whether duplicates are case-sensitive (default: `true`)
- `onChange?: (result) => void` - Callback when validation completes
- `className?: string` - CSS class for the root container

## Features

- **Textarea** for pasting bulk values
- **Summary badges** showing Total, Unique, Duplicates, Valid, Invalid counts
- **Side-by-side lists** of valid and invalid items
- **Copy buttons** to copy valid/invalid lists to clipboard
- **Loading states** during validation
- **Error handling** with user-friendly messages

## Custom Validators

```tsx
// API-based validator
const apiValidator = async (values: string[]) => {
  const response = await fetch('/api/validate', {
    method: 'POST',
    body: JSON.stringify({ values }),
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json(); // Should return { valid: string[], invalid: string[] }
};

<PasteSelect validate={apiValidator} />
```

## Styling

The component uses inline styles for a clean default appearance. Override with CSS:

```css
.my-paste-select textarea {
  font-family: 'Monaco', 'Courier New', monospace;
  border: 2px solid #007acc;
}

.my-paste-select button {
  background: linear-gradient(135deg, #007acc, #005299);
}
```

```tsx
<PasteSelect className="my-paste-select" validate={validator} />
```

## License

MIT
