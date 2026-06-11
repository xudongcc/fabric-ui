# Repo Map

## Important Paths

- Repo root markers: `components/`, `apps/docs/`, `packages/shadcn-ui/`, `pnpm-workspace.yaml`
- Component packages: `components/<name>/`
- shadcn/ui primitives: `packages/shadcn-ui/components/ui/`
- Shared shadcn utilities: `packages/shadcn-ui/lib/`, `packages/shadcn-ui/hooks/`, `packages/shadcn-ui/utils/`
- Docs pages: `apps/docs/content/docs/<category>/<name>.mdx`
- Docs examples: `apps/docs/examples/<preview-path>.tsx`
- Registry package builder: `apps/docs/lib/package.ts`
- Individual registry route: `apps/docs/app/r/[component]/route.ts`
- Full registry route: `apps/docs/app/r/registry.json/route.ts`
- Docs navigation categories: `apps/docs/content/docs/meta.json`

## Docs Categories

Prefer existing categories from `apps/docs/content/docs/meta.json`:

- `action`
- `display`
- `feedback`
- `form`
- `layout`
- `overlay`

Only create a new category when the component does not fit an existing one. If creating a category, update `apps/docs/content/docs/meta.json` so it appears in navigation.

## Preview Loading

`<Preview path="foo-bar" />` reads `apps/docs/examples/foo-bar.tsx` and dynamically imports that file. Every preview path in MDX needs a matching example file with a default export.

Example files should import public Fabric UI components from:

```tsx
import { FooBar } from "@/components/fabric-ui/foo-bar";
```

## Registry Generation

The registry builder reads each `components/<name>` directory and includes only root-level `.ts`, `.tsx`, and `.css` files. Keep component package source in the package root unless the registry builder is changed.

Registry dependencies are inferred from:

- `@/components/ui/<name>` imports in component files
- `@/components/thread-ui/<name>` imports in component files
- `@repo/*` dependencies declared in `components/<name>/package.json`

Do not manually edit generated registry JSON responses. Fix source files or package metadata instead.
