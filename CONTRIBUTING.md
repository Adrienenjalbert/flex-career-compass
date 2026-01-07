# Contributing to Indeed Flex Career Hub

First off, thank you for considering contributing to the Indeed Flex Career Hub! 🎉

This document provides guidelines and steps for contributing. Following these guidelines helps communicate that you respect the time of the developers managing this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code:

- **Be respectful** — Treat everyone with respect and kindness
- **Be constructive** — Provide helpful feedback and suggestions
- **Be inclusive** — Welcome newcomers and help them get started
- **Be professional** — Keep discussions focused and productive

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/indeed-flex-career-hub.git
   cd indeed-flex-career-hub
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/indeed-flex-career-hub.git
   ```

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs. actual behavior
- **Screenshots** if applicable
- **Browser/device information**

Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md).

### 💡 Suggesting Features

Feature suggestions are welcome! When proposing a feature:

- **Check existing issues** for similar suggestions
- **Explain the problem** your feature would solve
- **Describe the solution** you'd like to see
- **Consider alternatives** you've thought about

Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md).

### 📝 Improving Documentation

Documentation improvements are always welcome:
- Fix typos or unclear explanations
- Add missing documentation
- Improve code comments
- Update README sections

### 🔧 Contributing Code

1. **Find an issue** to work on (or create one)
2. **Comment** on the issue to let others know you're working on it
3. **Create a branch** for your changes
4. **Write tests** if applicable
5. **Submit a pull request**

---

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

### Project Structure Overview

```
src/
├── components/     # Reusable UI components
├── pages/          # Route page components
├── data/           # Static data files
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
└── integrations/   # External service integrations
```

---

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces (avoid `any`)
- Use meaningful variable and function names

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const getUserById = async (userId: string): Promise<UserProfile> => {
  // implementation
};

// ❌ Bad
const getUser = async (id: any): Promise<any> => {
  // implementation
};
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks

```tsx
// ✅ Good - Focused component
const ToolCard = ({ title, description, href }: ToolCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
};

// ❌ Bad - Component doing too much
const ToolCardWithEverything = () => {
  // 200 lines of mixed concerns
};
```

### Tailwind CSS

- Use semantic design tokens from `index.css`
- Avoid hardcoded colors in components
- Use responsive prefixes (`sm:`, `md:`, `lg:`)

```tsx
// ✅ Good - Using design tokens
<div className="bg-background text-foreground border-border">

// ❌ Bad - Hardcoded colors
<div className="bg-white text-black border-gray-200">
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `ToolCard.tsx`)
- Hooks: `camelCase.ts` (e.g., `useSpeechSynthesis.ts`)
- Data files: `kebab-case.ts` (e.g., `state-taxes.ts`)
- Pages: `PascalCase.tsx` (e.g., `ToolsPage.tsx`)

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, semicolons, etc.) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

### Examples

```bash
feat(calculator): add state tax breakdown display
fix(worktalk): resolve audio playback on iOS Safari
docs(readme): update installation instructions
refactor(hooks): simplify useSpeechSynthesis logic
```

---

## Pull Request Process

### Before Submitting

1. ✅ Update your fork with the latest upstream changes
2. ✅ Ensure all tests pass (if applicable)
3. ✅ Run linting: `npm run lint`
4. ✅ Test your changes in multiple browsers
5. ✅ Update documentation if needed

### PR Requirements

- **Clear title** following commit message conventions
- **Description** explaining what and why
- **Screenshots** for UI changes
- **Link to related issue** (if applicable)

### Review Process

1. A maintainer will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Celebrate! 🎉

---

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion
- Reach out to maintainers

Thank you for contributing! 🙌
