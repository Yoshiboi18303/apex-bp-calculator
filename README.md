# Apex Battle Pass Calculator

An npm package and CLI for calculating the exact number of stars needed to get to a certain level in the Apex Legends Battle Pass!

## Note

This package makes an estimation, it may not be exact. **Please feel free to contribute to fix the math, or anything else about the code for that matter.**

## Installation

### As CLI (recommended)

```bash
npm install -g @yoshiboi18303/apex-bp-calculator
```

### As npm package

```bash
npm install @yoshiboi18303/apex-bp-calculator
```

## Usage

### As CLI

```bash
abp
```

### As npm package (JavaScript)

```javascript
const bpCalculator = require("@yoshiboi18303/apex-bp-calculator");

console.log(bpCalculator.default(1, 10, 0)); // Replace the arguments with whatever you want
```

### As npm package (TypeScript)

```typescript
import bpCalculator from "@yoshiboi18303/apex-bp-calculator";

console.log(bpCalculator(1, 10, 0)); // Replace the arguments with whatever you want
```

## Website

Coming soon! Might be made with **[Docusaurus](https://docusaurus.io)**.

## License

This package is licensed under the **[MIT License](https://github.com/Yoshiboi18303/apex-bp-calculator/blob/main/LICENSE)**

## Contribution Guide

You can contribute to help this package! Here's a few steps to get started with that.

### Prerequisites

**[Node.js](https://nodejs.org)**
**npm**
**[Git](https://git-scm.com)**
**TypeScript**

> Note: Bolded prerequisites are required.

### Instructions

#### Clone the repository

Start by cloning the repository then going into the created directory.

**Run this in your terminal:**

```bash
git clone https://github.com/Yoshiboi18303/apex-bp-calculator
cd apex-bp-calculator
```

#### Install the dependencies

Now install the dependencies, which will be required for coding this package.

```bash
npm install
```

#### Make a symlink

Now, get the package ready to go globally as well as ready to be linked to other folders of yours.

```bash
npm run link
```

> This is the safe way to create the symlink, use this just once.

##### Link forcefully (not recommended)

```bash
npm run link:force
```

> **WARNING: THIS WILL RECKLESSLY REPLACE FILES, DO NOT USE THIS UNLESS YOU KNOW WHAT YOU ARE DOING AND YOU HAVE NO OTHER CHOICES.**

#### Build as you go

As you make updates to the CLI, you'll want to test them. You can do that by running the `build` script:

```bash
npm run build
```

**If you have [typescript](https://npmjs.com/package/typescript) installed globally:**

```bash
tsc
```

This will build the TypeScript code to JavaScript, which will allow you to run the code.
