# Verification

Run focused checks first, replacing `foo-bar` and `<category>`:

```bash
pnpm exec prettier --write components/foo-bar/index.tsx components/foo-bar/package.json components/foo-bar/tsconfig.json apps/docs/examples/foo-bar.tsx apps/docs/content/docs/<category>/foo-bar.mdx
pnpm exec tsc --noEmit -p components/foo-bar/tsconfig.json
pnpm exec tsc --noEmit -p apps/docs/tsconfig.json
pnpm exec eslint components/foo-bar/index.tsx apps/docs/examples/foo-bar.tsx
git diff --check
```

If package dependencies changed:

```bash
pnpm install --lockfile-only
git diff -- pnpm-lock.yaml
```

Keep only lockfile changes related to the current component. Existing untracked workspace packages can cause unrelated importers to appear.

If multiple example files were added, include all of them in the `prettier` and `eslint` commands. If docs navigation or registry code changed, include those files in formatting and lint checks too.

Before the final response, run:

```bash
git status --short
git diff --stat
```

Use this to separate intentional changes from unrelated dirty files.

If docs MDX is ignored by ESLint, report that as an ignored file warning rather than a failure.

For frontend-visible changes, start or reuse the docs dev server and verify the preview in the browser when practical.

## Final Response Checklist

Mention:

- Component files and docs/examples created or updated.
- Dependency or lockfile changes.
- Verification commands and their results.
- Any unrelated dirty worktree files left untouched.
