# WormGPT (adapted for OpenCode Zen free models)

Desktop chat client built with Electron + React, now powered by **OpenCode Zen** free models instead of Groq.

## Changes from original
- Switched API endpoint to OpenCode Zen (`https://opencode.ai/zen/v1`)
- Default model: `big-pickle` (free)
- Removed jailbreak system prompt
- Settings label updated to "OpenCode Zen API key"

## Features
- Multi-chat sidebar with persistent history
- API key manager (save, test, revoke)
- Local chat storage
- Renderer bundle obfuscation (deterrent, not a guarantee)
- Optional GPU disable flag for troubleshooting

## Get a free API key
1. Go to https://opencode.ai/auth
2. Sign in / create account
3. Create an API key
4. Paste it in the app Settings

Free models (may change over time): `big-pickle`, `deepseek-v4-flash-free`, `nemotron-3-ultra-free`, `mimo-v2.5-free`, etc.

## Requirements
- Node.js 18+ (LTS recommended)
- Windows 10/11 for installer builds

## Install
```sh
npm install
```

## Run (dev)
```sh
npm run start
```

## Build the renderer bundle
```sh
npm run build:renderer
```

## Build Windows EXE (installer + portable)
```sh
npm run dist
```

Outputs will be in `dist/`.

## GPU disable (optional)
PowerShell:
```powershell
$env:WORMGPT_DISABLE_GPU='1'; npm run start
```

Or pass a flag:
```sh
npm run start -- --disable-wormgpt-gpu
```

## API key storage
Set your API key in Settings. It is stored locally at:
`%APPDATA%\\wormgpt\\wormgpt-data.json`

Use the Revoke button to remove it.
