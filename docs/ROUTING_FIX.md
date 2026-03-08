# Gallery Routing Fix

## Issue
**Error**: `Failed to fetch` when clicking on gallery story links
**Type**: Console TypeError in Next.js navigation

## Root Cause
The dynamic route page (`app/gallery/[slug]/page.tsx`) had two issues:

1. **Using `'use client'` directive** - This prevented proper server-side rendering of dynamic routes
2. **Incorrect params handling** - In Next.js 15+, `params` is now a Promise that must be awaited

## The Fix

### 1. Changed to Server Component
**Before:**
```tsx
'use client';

export default function GallerySlugPage({ params }: { params: { slug: string } }) {
  const story = weddingStories[params.slug as keyof typeof weddingStories];
  // ...
}
```

**After:**
```tsx
// No 'use client' directive - this is now a Server Component

export default async function GallerySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = weddingStories[slug as keyof typeof weddingStories];
  // ...
}
```

### 2. Extracted Client Animations
Since animations require client-side JavaScript, we created a separate client component:

**New file: `app/gallery/[slug]/HeroAnimation.tsx`**
```tsx
'use client';

import { motion } from 'framer-motion';

export default function HeroAnimation({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

// Additional animation components...
```

### 3. Updated Page to Use Client Components
The main page imports and uses the animation components:
```tsx
import HeroAnimation, { HeroText, HeroFade } from './HeroAnimation';

// Then in JSX:
<HeroAnimation>
  <div className="...">
    <HeroFade delay={0.2}>
      <p>{story.category} Story</p>
    </HeroFade>
    {/* ... more animated content */}
  </div>
</HeroAnimation>
```

## Why This Works

### Next.js 15+ Changes
- **Async params**: Dynamic route parameters are now Promises to support streaming and better performance
- **Server Components by default**: Pages without `'use client'` are Server Components
- **Better hydration**: Separating server and client logic improves initial page load

### Benefits of This Approach
1. ✅ **Server-side rendering** - Initial HTML is rendered on server
2. ✅ **Better performance** - Data fetching happens on server
3. ✅ **SEO friendly** - Search engines can crawl the content
4. ✅ **Progressive enhancement** - Content loads even without JavaScript
5. ✅ **Proper routing** - Next.js can correctly handle the dynamic routes

## File Structure
```
app/gallery/[slug]/
├── page.tsx           # Server Component (async, awaits params)
└── HeroAnimation.tsx  # Client Component (handles animations)
```

## Testing
After this fix, the following should work:

1. Navigate to `/gallery`
2. Click on any story card (e.g., "Priya & Rahul")
3. Page should load without errors
4. URL should change to `/gallery/priya-and-rahul`
5. Hero animations should play smoothly
6. Back button should work correctly

## Related Documentation
- [Next.js 15 Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Async Request APIs](https://nextjs.org/docs/app/api-reference/functions/headers#async-request-apis)

## Note
This fix maintains the visual experience (animations) while ensuring proper Next.js routing behavior. The separation of concerns (server rendering data, client handling interactivity) follows Next.js best practices.
