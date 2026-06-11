# Component Conventions

## Files

For a component named `foo-bar`, create or update:

- `components/foo-bar/index.tsx`
- `components/foo-bar/package.json`
- `components/foo-bar/tsconfig.json`
- `apps/docs/examples/foo-bar.tsx`
- `apps/docs/content/docs/<category>/foo-bar.mdx`
- Additional examples referenced by that docs page
- `pnpm-lock.yaml`, only when package dependencies change

When modifying an existing component, update only the files affected by the public API, behavior, examples, or dependencies. Do not create new docs/examples just for an internal-only refactor.

Keep component package implementation files at the package root. The current registry builder does not collect nested source files.

## Naming

- Folder/package suffix: kebab-case, e.g. `foo-bar`.
- Component export: PascalCase, e.g. `FooBar`.
- Props export: PascalCase plus `Props`, e.g. `FooBarProps`.
- Example files: kebab-case, e.g. `foo-bar.tsx`, `foo-bar-disabled.tsx`.
- Docs title: human-readable component name, usually PascalCase or spaced title matching nearby docs.

## Package Metadata

Use kebab-case for the folder and package suffix:

```json
{
  "name": "@repo/foo-bar",
  "description": "Short user-facing component description.",
  "version": "0.0.0",
  "private": true
}
```

Dependencies:

- Always include `react` and `react-dom` when the component renders React.
- Add `@repo/<component>` dependencies for Fabric UI components imported via `@/components/fabric-ui/<component>`.
- Add runtime package dependencies that appear in component code, such as `lucide-react`, `@tanstack/react-table`, or Base UI packages.
- Keep `@repo/tsconfig`, `@types/react`, `@types/react-dom`, and `typescript` in `devDependencies`.

Use the same `tsconfig.json` shape as existing components, including the `@/components/fabric-ui/*`, `@/components/*`, `@/utils/*`, `@/lib/*`, and `@/hooks/*` path aliases.

## Implementation Style

- Add `"use client";` when the component uses hooks, event handlers, browser APIs, or client-only primitives.
- Export the public component and public prop types from `index.tsx`; use named exports for library components.
- Prefer wrapping existing `@/components/ui/*` primitives and existing Fabric UI components.
- Check `packages/shadcn-ui/components/ui/` before assuming a primitive exists or needs to be created.
- Use `ComponentProps<typeof ExistingComponent>` when extending another component's API.
- Use `ReactNode` for slots and custom render content.
- Keep class composition with `cn`.
- Keep comments rare; add them only for non-obvious behavior.
- Do not introduce unrelated abstractions or refactors.

## Docs And Examples

Docs pages should follow existing MDX structure:

````mdx
---
title: FooBar
description: Short user-facing component description.
---

<Preview path="foo-bar" />

## Installation

```bash
pnpm dlx shadcn@latest add @fabric-ui/foo-bar
```

## Usage

```tsx
import { FooBar } from "@/components/fabric-ui/foo-bar";
```

## API Reference

### FooBarProps

<AutoTypeTable
  path="../../components/foo-bar/index.tsx"
  type={`Pick<FooBarProps, 'important' | 'props'>`}
/>
````

Use `AutoTypeTable` for public props. Keep examples realistic and minimal, and create every example file referenced by `<Preview path="...">`.

Example files should default export the rendered example component:

```tsx
const Example = () => <FooBar />;

export default Example;
```

Keep docs frontmatter `description` aligned with `components/<name>/package.json` unless there is a good reason for a more docs-specific phrase.

## Registry Dependencies

The docs registry builder scans component source for:

- `@/components/ui/<name>` and adds shadcn registry dependencies.
- `@/components/thread-ui/<name>` and adds thread-ui registry dependencies.
- `@repo/*` dependencies from `components/<name>/package.json` and adds Fabric UI registry dependencies.

When adding a Fabric UI dependency, update `components/<name>/package.json`, then run `pnpm install --lockfile-only`. Review `pnpm-lock.yaml` carefully and remove unrelated importer changes caused by existing untracked workspace packages.
