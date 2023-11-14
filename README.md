# Simple Polkadot{.js} Script Examples

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![TypeScript](https://img.shields.io/badge/TypeScript-000000?logo=typescript&logoColor=white)

This repository contains examples of how to use the polkadot{.js} API to connect to a node and perform some basic operations.

**Join the discussion in our [Telegram Group](https://t.me/inkathon)** 💬

## Getting started

> **Pre-requisites:**
>
> - Setup Node.js v18+ (recommended via [nvm](https://github.com/nvm-sh/nvm) with `nvm install 18`)
> - Clone this repository

<details>
<summary><strong>Special Instructions for Windows Users</strong></summary>

> [!IMPORTANT]  
> PowerShell is not supported. Windows users must either use [WSL](https://learn.microsoft.com/windows/wsl/install) (recommended) or a custom shell like [Git Bash](https://git-scm.com/downloads).

> **Pre-requisites when using WSL for Linux:**
>
> - Install [WSL](https://learn.microsoft.com/windows/wsl/install) and execute _all_ commands in the WSL terminal
> - Setup Node.js v18+ (recommended via [nvm](https://github.com/nvm-sh/nvm) with `nvm install 18`)
> - Install the following npm packages globally:
> - `npm i -g npm`
> - `npm i -g pnpm node-gyp make`
> - Clone this repository into the WSL file system (e.g. `/home/<user>/`).
>
> **Tip:** You can enter `\\wsl$\` in the top bar of the Windows Explorer to access the WSL file system visually.

</details>

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
> These commands will run a TypeScript script directly using [`tsx`](https://github.com/privatenumber/tsx). Alternatively, you can build the TypeScript files and run the JavaScript output using `node`.

```bash
pnpm run script traverse-events-at-block
## or
npm run script traverse-events-at-block
## or
yarn run script traverse-events-at-block
```

## Example Scripts

> [!NOTE]  
> You can use this repository as a starting point for your own scripts, ignore the examples, and uninstall redundant dependencies.

| Macros                     | Description                                        | Dependencies                                                            |
| -------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| `balance`                  | Fetches the balance for a given network & address. | `@polkadot/api`<br/>`@scio-labs/use-inkathon`<br/>`@azns/resolver-core` |
| `listen-contract-events`   | Listens & decodes ink! contract events.            | `@polkadot/api`<br/>`@polkadot/api-contract`                            |
| `traverse-events-at-block` | Traverses all events at a specific block.          | `@polkadot/api`                                                         |

## About

The project is part of a [Scio Labs](https://scio.xyz) initiative to improve the developer experience in the ink! ecosystem. Other projects include:

- `create-ink-app` CLI (_Coming soon_)
- [`ink!athon`](https://github.com/scio-labs/inkathon) Boilerplate
- [`useInkathon`](https://github.com/scio-labs/use-inkathon) Hooks & Utility Library
- [`zink!`](https://github.com/scio-labs/zink) Smart Contract Macros
