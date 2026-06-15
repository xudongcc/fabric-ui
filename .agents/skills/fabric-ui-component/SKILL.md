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
6. If updating an upstream registry component, use the commands in [Updating Upstream Components](#updating-upstream-components).
7. Make scoped edits with `apply_patch`; do not add scripts or generators for this skill yet.
8. Read [verification.md](references/verification.md) before final checks or completion claims.

## Updating Upstream Components

Use `shadcn` from the repo root and point it at `packages/shadcn-ui`; otherwise the CLI writes to the wrong project.

Update one Thread UI component:

```bash
pnpm dlx shadcn@latest add @thread-ui/<name> -y -o -c packages/shadcn-ui
```

Preview all locally installed Thread UI components before overwriting:

```bash
pnpm dlx shadcn@latest add $(find packages/shadcn-ui/components/thread-ui -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort | sed 's#^#@thread-ui/#') -y -o --dry-run -c packages/shadcn-ui
```

Apply the batch update by running the same command without `--dry-run`. Do not use `pnpm dlx shadcn@latest add @thread-ui -a`; with the current registry alias, the CLI resolves that against the default shadcn registry instead of `thread-ui.vercel.app`.

After an upstream update:

- Review the CLI output for overwritten shared primitives such as `components/ui/button.tsx`, `components/ui/badge.tsx`, or `components/ui/checkbox.tsx`.
- Adapt Fabric wrappers in `components/<name>/` when upstream exports changed, such as `PageAction` becoming `PageActions`.
- Run focused `tsc` checks for affected Fabric packages and `apps/docs`; `packages/shadcn-ui` may have unrelated existing type errors.
- Review `pnpm-lock.yaml` if the CLI installed dependencies.

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
- Formatting or linting `packages/shadcn-ui` after registry updates without checking ignore rules; that directory is registry-managed and may be intentionally ignored.
