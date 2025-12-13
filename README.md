# Playwright MCP Project

A Playwright end-to-end testing project with MCP (Model Context Protocol) support.

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see the browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug

# View test report
npm run report
```

## Playwright MCP

This project includes `@playwright/mcp` for AI-powered browser automation.

### Running MCP Server

```bash
npm run mcp
```

### MCP Configuration

To use Playwright MCP with an AI assistant, add to your MCP settings:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

## Project Structure

```
├── tests/              # Test files
│   └── example.spec.ts # Example test
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
