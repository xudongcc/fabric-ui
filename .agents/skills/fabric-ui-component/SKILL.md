---
name: fabric-ui-component
description: Use when creating, modifying, or extending a Fabric UI component in the fabric-ui repository, including components/<name>, docs examples, package metadata, registry dependencies, shadcn/ui wrappers, AutoTypeTable docs, or component verification.
---

# Fabric UI Component

## Purpose

Create components in `fabric-ui` using the repository's existing package, docs, and registry conventions. Keep the first version boring: match nearby components, avoid custom scaffolding unless the repo already has the pattern, and leave unrelated worktree changes alone.

## Workflow

1. Run `git status --short` and note unrelated modified or untracked files before editing.
2. Confirm the current repo has `components/`, `apps/docs/`, and `packages/shadcn-ui/`.
3. Inspect similar components under `components/`, including `index.tsx`, `package.json`, `tsconfig.json`, docs MDX, and examples.
4. Read [repo-map.md](references/repo-map.md) to understand how docs previews and registry output are wired.
5. Read [component-conventions.md](references/component-conventions.md) before creating or changing component files.
6. Make scoped edits with `apply_patch`; do not add scripts or generators for this skill yet.
7. Read [verification.md](references/verification.md) before final checks or completion claims.

## Reference Map

- [repo-map.md](references/repo-map.md): important repo paths, docs categories, preview loading, and registry generation.
- [component-conventions.md](references/component-conventions.md): package shape, naming, implementation style, docs, examples, and dependency behavior.
- [verification.md](references/verification.md): focused commands, lockfile review, browser check guidance, and final response checklist.

## Common Pitfalls

- Missing `@repo/<component>` in `components/<name>/package.json` when importing another Fabric UI component.
- Referencing a `<Preview path="...">` without creating the matching file in `apps/docs/examples/`.
- Letting `pnpm install --lockfile-only` add unrelated importers from existing untracked workspace packages.
- Moving shared code into nested files under `components/<name>/`; the registry builder only collects root package `.ts`, `.tsx`, and `.css` files.
- Replacing user work or unrelated dirty files while scaffolding a component.
