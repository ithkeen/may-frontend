# AGENTS.md

## Project Overview

This project is a frontend service for generating listing images for pet products.

## Getting Started

- Install dependencies: `pnpm install`
- Start the development server: `pnpm dev`
- Open the app: `http://localhost:3000`

For an explicit local host and port, run:

```bash
pnpm dev --hostname 127.0.0.1 --port 3000
```

## Build and Test Commands

- Lint: `pnpm lint`
- Check formatting: `pnpm format:check`
- Format files: `pnpm format:write`
- Production build: `pnpm build`
- Start the production server after building: `pnpm start`
- End-to-end tests: `pnpm test:e2e`

If Playwright browsers are not installed on a fresh machine, install Chromium first:

```bash
pnpm exec playwright install chromium
```

## Docker

- Build the image: `docker build -t may-frontend .`
- Run the container: `docker run --rm -p 3000:3000 may-frontend`
- Open the app: `http://localhost:3000`

## Project Decisions

See [doc/tech-stack.md](doc/tech-stack.md) for confirmed technical stack decisions.
