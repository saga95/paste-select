# 🎯 PasteBox

[![npm version](https://badge.fury.io/js/pastebox-core.svg)](https://www.npmjs.com/package/pastebox-core) 
[![npm version](https://badge.fury.io/js/pastebox-react.svg)](https://www.npmjs.com/package/pastebox-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**The ultimate bulk paste solution for React applications.** Parse, validate, and handle thousands of pasted values with ease.

Perfect for enterprise dashboards, admin panels, and data filtering interfaces where users need to paste large lists of IDs, SKUs, emails, or codes.

## ✨ Features

- 🚀 **Fast**: Handles 10,000+ values efficiently
- 🎯 **Smart Parsing**: Auto-detects commas, newlines, tabs, semicolons
- 🔍 **Flexible Validation**: In-memory sets or async API validation
- 📊 **Visual Feedback**: Real-time counts and lists of valid/invalid items
- ⚛️ **React Ready**: Drop-in component with TypeScript support
- 🎨 **Headless Core**: Use with any UI framework
- 📦 **Zero Dependencies**: Lightweight and tree-shakeable

## 🚀 Quick Start

```bash
npm install pastebox-react pastebox-core
```

```tsx
import { PasteSelect } from "pastebox-react";
import { inMemorySetValidator } from "pastebox-core";

const allowedValues = new Set(["A123", "B456", "C789", "SKU-999"]);

function App() {
  return (
    <PasteSelect 
      validate={inMemorySetValidator(allowedValues)}
      onChange={(result) => {
        console.log(`${result.validate.valid.length} valid items found!`);
      }}
    />
  );
}
```

## 📦 Packages

### `pastebox-core` - Headless Utilities
```bash
npm install pastebox-core
```

Pure parsing and validation logic. Framework agnostic.

```ts
import { parse, inMemorySetValidator } from "pastebox-core";

const text = "A123,B456\nC789, A123"; // messy input
const result = parse(text);
console.log(result.uniques); // ["A123", "B456", "C789"]

const validator = inMemorySetValidator(new Set(["A123", "C789"]));
const validation = await validator(result.uniques);
// { valid: ["A123", "C789"], invalid: ["B456"] }
```

### `pastebox-react` - React Component
```bash
npm install pastebox-react pastebox-core
```

Ready-to-use React component with visual feedback.

## 🎮 Try the Demo

**[Live Demo →](https://sagarah.github.io/paste-select)**

Try pasting this sample data:
```
A123, B456
C789; INVALID-001
SKU-999    ITEM-001
A123 (duplicate)
```

## 💡 Use Cases

- **SaaS Dashboards**: Bulk SKU/product code filtering
- **Enterprise CRMs**: Bulk email or customer ID validation  
- **Admin Panels**: Import/validate large datasets
- **Marketing Tools**: Clean pasted contact lists
- **Internal Tools**: Process ticket IDs, reference numbers

## 🔧 API Reference

### Core Functions

#### `parse(input, options)`
Parse pasted text into structured data.

```ts
type ParseOptions = {
  delimiters?: string[];      // Default: [",", "\n", "\t", ";"]
  normalize?: (v: string) => string;  // Default: v => v.trim()
  caseSensitive?: boolean;    // Default: true
  maxValues?: number;         // Default: 10000
};
```

#### Validators

```ts
// In-memory validation
const validator = inMemorySetValidator(allowedSet);

// Batched API validation  
const validator = batchedValidator(
  async (batch) => {
    const response = await fetch('/api/validate', {
      method: 'POST',
      body: JSON.stringify({ values: batch })
    });
    return response.json(); // { valid: string[], invalid: string[] }
  },
  500 // batch size
);
```

### React Component

#### `<PasteSelect>` Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `validate` | `ValidateFn` | ✅ | Function to validate values |
| `delimiters` | `string[]` | ❌ | Custom delimiters |
| `normalize` | `(v: string) => string` | ❌ | Value normalizer |
| `maxValues` | `number` | ❌ | Max values (default: 10000) |
| `caseSensitive` | `boolean` | ❌ | Case sensitivity (default: true) |
| `onChange` | `(result) => void` | ❌ | Result callback |
| `className` | `string` | ❌ | CSS class |

## 🏗️ Development

```bash
# Clone the repository
git clone https://github.com/sagarah/paste-select.git
cd paste-select

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run demo
pnpm dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [sagarah](https://github.com/sagarah)

## 🙏 Acknowledgments

Built with:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) 
- [tsup](https://tsup.egoist.dev/)
- [pnpm](https://pnpm.io/)

---

**⭐ If this library helped you, please consider giving it a star!**
