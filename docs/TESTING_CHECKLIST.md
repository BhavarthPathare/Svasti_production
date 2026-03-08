# Gallery Performance Testing Checklist

## Quick Visual Tests

### 1. Gallery Page (`/gallery`)
- [ ] Page loads quickly (1-2 seconds)
- [ ] First 3 story cards appear immediately
- [ ] Remaining cards load progressively
- [ ] Hover effects work smoothly (image zoom, overlay)
- [ ] Category filtering works without lag
- [ ] Clicking a story card navigates correctly

### 2. Gallery Detail Pages
- [ ] `/gallery/priya-and-rahul` loads quickly
- [ ] `/gallery/neha-and-arjun` loads quickly
- [ ] `/gallery/aisha-and-vikram` loads quickly
- [ ] Hero image loads with priority
- [ ] Gallery images below fold lazy load
- [ ] Lightbox opens smoothly when clicking images
- [ ] Navigation buttons work correctly

### 3. Performance Checks
- [ ] No layout shift during page load
- [ ] Smooth scrolling throughout
- [ ] Images are properly sized (not oversized)
- [ ] Browser console shows no errors
- [ ] Network tab shows images loading progressively

## Browser Testing

### Desktop
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari

### Mobile
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Responsive layout works correctly

## Performance Metrics to Check

Open Chrome DevTools → Lighthouse and run audit:

### Expected Scores (after optimization)
- **Performance**: 85-95+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Key Metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms

## Network Performance

Check in DevTools → Network tab:

- [ ] Images are optimized (WebP format from Next.js)
- [ ] Images have appropriate sizes for viewport
- [ ] Lazy loading images load on scroll
- [ ] No unnecessary requests on page load
- [ ] Total page size < 2MB on initial load

## Common Issues to Watch For

❌ **Issues Fixed:**
- ~~Images loading at full size~~
- ~~All animations running simultaneously~~
- ~~Staggered animation delays~~
- ~~Regular img tags used~~

✅ **Current State:**
- Next.js Image component with optimization
- Lazy loading for below-fold content
- Priority loading for above-fold content
- Minimal animations (only where needed)

## Testing Commands

```bash
# Start dev server
cd viyafilms-clone
npm run dev

# Build production version
npm run build

# Test production build
npm start

# Check bundle size
npm run build
```

## Quick Performance Test

1. Open Chrome DevTools
2. Go to Network tab → Disable cache → Reload
3. Check:
   - DOMContentLoaded: < 2s
   - Load: < 3s
   - Finish: < 5s

## Regression Testing

If performance degrades in future:

1. Check if new animations were added
2. Verify Image component is used (not img tags)
3. Confirm lazy loading is enabled
4. Review bundle size changes
5. Check for unnecessary re-renders

## Notes

- Hero animations kept for visual impact
- Hover transitions maintained for UX
- Balance between performance and aesthetics
- First 3 gallery cards prioritized
- First 6 detail page images eager loaded
