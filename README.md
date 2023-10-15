# Simple Polkadot{.js} Script Examples

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![TypeScript](https://img.shields.io/badge/TypeScript-000000?logo=typescript&logoColor=white)

This repository contains examples of how to use the polkadot{.js} API to connect to a node and perform some basic operations.

## Getting started

> **Pre-requisites:**
>
> - Setup Node.js v16+ (recommended via [nvm](https://github.com/nvm-sh/nvm))
> - Clone this repository

**Install dependencies:**

```bash
pnpm install
## or
npm install
## or
yarn install
```

**Run a script:**

> [!NOTE]  
> These commands will run a TypeScript script directly using `ts-node`. Alternatively, you can build the TypeScript files and run the JavaScript output using `node`.

```bash
pnpm run script traverse-events
## or
npm run script traverse-events
## or
yarn run script traverse-events
```

## About

The project is part of a [Scio Labs](https://scio.xyz) initiative to improve the developer experience in the ink! ecosystem. Other projects include:

- `create-ink-app` CLI (_Coming soon_)
- [`ink!athon`](https://github.com/scio-labs/inkathon) Boilerplate
- [`useInkathon`](https://github.com/scio-labs/use-inkathon) Hooks & Utility Library
- [`zink!`](https://github.com/scio-labs/zink) Smart Contract Macros
