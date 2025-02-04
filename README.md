# Valkey.io

A modern React application built with Vite and TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [pnpm](https://pnpm.io/) (version 8.15.1 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/valkey.io.git
cd valkey.io
```

2. Install dependencies:
```bash
pnpm install
```

## Development

To start the development server:
```bash
pnpm dev
```

This will start the development server at `http://localhost:5173`

## Building for Production

To create a production build:
```bash
pnpm build
```

The built files will be in the `dist` directory.

To preview the production build locally:
```bash
pnpm preview
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## Tech Stack

- React 18
- TypeScript
- Vite
- ESLint
- Node.js

## Project Structure

```
valkey.io/
├── src/           # Source files
├── public/        # Static files
├── dist/         # Built files (after running build)
└── package.json  # Project configuration
```

## License

[MIT](LICENSE)
