# eslint-plugin-ternary-depth

ESLint plugin to limit the depth of nested ternary expressions

## Installation

```bash
npm install eslint-plugin-ternary-depth --save-dev
```

## Usage

Add `ternary-depth` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["ternary-depth"]
}
```

Then configure the rules you want to use:

```json
{
  "rules": {
    "ternary-depth/max-depth": ["error", { "maxDepth": 2 }]
  }
}
```

Or use the recommended configuration:

```json
{
  "extends": ["plugin:ternary-depth/recommended"]
}
```

## Rules

### ternary-depth/max-depth

This rule limits the depth of nested ternary expressions.

#### Options

* `maxDepth`: Maximum allowed depth of nested ternary expressions (default: 2)

#### Examples

```js
// Valid with maxDepth: 2
const value = condition1 ? (condition2 ? valueA : valueB) : valueC;

// Invalid with maxDepth: 2
const value = condition1 
  ? (condition2 
    ? (condition3 ? valueA : valueB) 
    : valueC) 
  : valueD;
```

