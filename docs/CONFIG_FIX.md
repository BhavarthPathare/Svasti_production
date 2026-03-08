# Next.js Configuration Fix

## Issue Identified
The `next.config.ts` file contained an `i18n` configuration that is **incompatible with the App Router**.

## The Problem

```typescript
// ❌ This causes routing issues with App Router
i18n: {
  locales: ['en'],
  defaultLocale: 'en',
}
```

### Why This Is an Issue
- The `i18n` config is **only for Pages Router** (old Next.js routing)
- Using it with **App Router** causes routing failures
- Results in "Failed to fetch" errors when navigating
- Conflicts with client-side routing

## The Fix

**Removed the incompatible config:**
```typescript
// ✅ Removed i18n config
// Note: i18n config is not compatible with App Router
// Use next-intl or similar for App Router i18n
```

## For Future i18n Needs

If you need internationalization with App Router, use:
- **next-intl** - Popular i18n library for App Router
- **Manual implementation** - Using middleware and route segments
- **Parallel routes** - Using `[locale]` folders in app directory

## How to Test the Fix

1. Stop the dev server
2. Clear `.next` cache: `rm -rf .next` or `Remove-Item -Recurse -Force .next`
3. Start dev server: `npm run dev`
4. Navigate to `/gallery`
5. Click on any story card
6. Should now work without "Failed to fetch" error

## Related Files
- `next.config.ts` - Configuration file (fixed)
- `app/gallery/[slug]/page.tsx` - Dynamic route (already fixed for Next.js 15+)

## Summary
Removed incompatible `i18n` configuration from `next.config.ts` that was causing routing issues with the App Router.
