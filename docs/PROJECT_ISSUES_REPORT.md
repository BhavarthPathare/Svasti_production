# 🔍 Project Issues Report

Generated: ${new Date().toLocaleDateString()}

## 📊 Executive Summary

This Next.js 16.0.1 photography/videography website project is **generally well-structured** but has several issues that need attention:

### 🚨 Critical Issues: 1
### ⚠️ Warnings: 4
### 💡 Recommendations: 5

---

## 🚨 CRITICAL ISSUES

### 1. Exposed Sensitive Credentials in `.env.local`
**Severity:** 🔴 CRITICAL - Security Risk
**File:** `.env.local`

**Problem:**
- Gmail credentials are committed and exposed in the repository
- YouTube API key is publicly visible
- This is a **major security vulnerability**

**Current Exposure:**
```env
SMTP_USER=bhavarth16@gmail.com
SMTP_PASSWORD=yvomsjxldgukfuyw  # EXPOSED APP PASSWORD
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyAqZvHxjrMXs8_yvkciyiQqkEuYvB3le2g  # EXPOSED
CONTACT_EMAIL_TO=bhavarth16@gmail.com
```

**Immediate Actions Required:**
1. ❌ **REVOKE** the Gmail app password immediately
2. ❌ **REGENERATE** YouTube API key
3. ✅ Remove `.env.local` from git tracking:
   ```bash
   git rm --cached .env.local
   git commit -m "Remove exposed credentials"
   ```
4. ✅ Add to `.gitignore` (should already be there, but verify)
5. ✅ Generate new credentials
6. ✅ Update credentials in production environment only
7. ✅ Review git history to remove exposed secrets

**Prevention:**
- Never commit `.env.local` files
- Use environment variables in production
- Consider using secret management tools (Vercel Environment Variables, AWS Secrets Manager, etc.)

---

## ⚠️ WARNINGS

### 1. Build Warning - Workspace Root Inference
**Severity:** ⚠️ Medium
**File:** `next.config.ts`

**Problem:**
```
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
```

**Current Config:**
```typescript
turbopack: {
  root: __dirname,
}
```

**Solution:**
The `turbopack.root` configuration may be causing issues. Consider:
```typescript
// Option 1: Remove if not needed
// turbopack: {
//   root: __dirname,
// },

// Option 2: Specify explicitly
turbopack: {
  root: process.cwd(),
}
```

---

### 2. Inconsistent Branding
**Severity:** ⚠️ Low
**Files:** Multiple

**Problem:**
Project mixes two brand names:
- `Svati_Production` (package.json)
- `Svasti Production` (email templates)

**Locations:**
- `package.json`: `"name": "Svati_Production"`
- `lib/email-config.ts`: `businessName: 'Svasti Production'`

**Recommendation:**
Decide on one consistent name and update all references.

---

### 3. Missing Error Boundary
**Severity:** ⚠️ Medium
**Files:** App structure

**Problem:**
No custom error boundary implemented. The app relies on Next.js default error handling.

**Recommendation:**
Create `app/error.tsx` for better error handling:
```tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </div>
    </div>
  );
}
```

---

### 4. Hardcoded Fallback Data
**Severity:** ⚠️ Low
**File:** `lib/directus.ts`

**Problem:**
Directus connection failures fall back to hardcoded sample images:
```typescript
return [
  'https://cms.viyafilms.com/assets/e5445f5b-19a5-4359-99bb-d250b834ae07',
  // ... more hardcoded URLs
];
```

**Recommendation:**
- Add proper error logging
- Show user-friendly error message
- Consider retry logic before falling back

---

## 💡 RECOMMENDATIONS

### 1. Environment Variable Validation
**Priority:** High

**Problem:**
No validation of required environment variables at startup.

**Solution:**
Create `lib/env-validation.ts`:
```typescript
export function validateEnv() {
  const required = [
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'CONTACT_EMAIL_TO',
    'NEXT_PUBLIC_DIRECTUS_URL',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
```

Call this in `app/layout.tsx` or `middleware.ts`.

---

### 2. Add Rate Limiting for Contact Form
**Priority:** High

**Problem:**
No rate limiting on `/api/contact` endpoint - vulnerable to spam/abuse.

**Solution:**
Consider using:
- `@upstash/ratelimit` with Redis
- Vercel's built-in rate limiting
- Or simple in-memory solution for small traffic

---

### 3. TypeScript Strict Mode Configuration
**Priority:** Medium

**Current Config:**
```json
{
  "strict": true
}
```

**Recommendation:**
The project uses `any` types in several places. Consider enabling:
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

**Locations with `any`:**
- `lib/notification-service.ts`: FormData parameters
- `lib/directus.ts`: Directus response mapping

---

### 4. Missing Loading States
**Priority:** Medium

**Problem:**
Most pages don't have loading states for async data fetching.

**Recommendation:**
Add `loading.tsx` files:
```tsx
// app/gallery/loading.tsx
export default function Loading() {
  return <div>Loading gallery...</div>;
}
```

---

### 5. Accessibility Improvements
**Priority:** Medium

**Areas Needing Attention:**
1. Add `alt` text validation for all images
2. Ensure keyboard navigation works for all interactive elements
3. Add ARIA labels where needed
4. Test with screen readers

**Example Issues Found:**
- Some buttons may lack proper labels
- Form validation errors need proper announcements

---

## 📝 Code Quality Issues

### Console Logs in Production
**Files:** Multiple

Found `console.log`, `console.warn`, `console.error` throughout:
- `lib/notification-service.ts` (9 instances)
- `lib/youtube.ts` (3 instances)
- `app/api/contact/route.ts` (3 instances)

**Recommendation:**
Use a logging library or remove/conditionally include based on environment:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

---

## 🔒 Security Checklist

- [ ] **URGENT:** Rotate exposed credentials
- [ ] Remove `.env.local` from git history
- [ ] Add rate limiting to API endpoints
- [ ] Validate and sanitize all form inputs
- [ ] Add CSRF protection
- [ ] Set up Content Security Policy headers
- [ ] Enable HTTPS in production
- [ ] Review CORS settings

---

## 🚀 Performance Opportunities

### Current Optimizations (Good):
- ✅ Image optimization configured
- ✅ Framer Motion lazy loading
- ✅ Next.js 16 with Turbopack

### Additional Opportunities:
1. Add `loading.tsx` for better UX during SSR
2. Consider implementing ISR (Incremental Static Regeneration) for gallery pages
3. Add service worker for offline support
4. Implement image lazy loading with blur placeholders

---

## 📦 Dependencies Status

### Potential Version Issues:
- `zod`: Using v4.1.12 (latest is v3.x) - **This might be incorrect**
  - Check if this is intentional or a typo
  - Latest stable is 3.x, v4 may be beta/experimental

### Dependencies Review:
```json
"react": "19.2.0",          // ✅ Latest RC
"next": "16.0.1",           // ✅ Latest
"nodemailer": "^7.0.10",    // ✅ Latest
"zod": "^4.1.12"            // ⚠️ Check this
```

---

## 🧪 Testing Gaps

**Current State:** No automated tests found

**Recommendations:**
1. Add unit tests for utility functions
2. Add integration tests for API routes
3. Add E2E tests for critical flows (contact form)
4. Consider using:
   - Jest for unit tests
   - React Testing Library for component tests
   - Playwright or Cypress for E2E tests

---

## 📋 Documentation Issues

### Good Documentation:
- ✅ Extensive setup guides
- ✅ Email configuration documented
- ✅ Deployment guides

### Missing Documentation:
- ⚠️ No API documentation
- ⚠️ No component documentation
- ⚠️ No troubleshooting guide for common errors

---

## ✅ What's Working Well

1. **Well-structured codebase** - Good separation of concerns
2. **Modern tech stack** - Latest Next.js, React 19
3. **Comprehensive email system** - Multi-channel notifications
4. **Good component organization** - Clear folder structure
5. **Responsive design** - Mobile-friendly implementation
6. **Extensive documentation** - Setup and configuration guides

---

## 🎯 Priority Action Items

### Immediate (Do Today):
1. 🔴 **Rotate all exposed credentials**
2. 🔴 Remove `.env.local` from git
3. 🟡 Fix workspace root warning

### Short-term (This Week):
4. 🟡 Add rate limiting to contact form
5. 🟡 Create error boundary
6. 🟡 Add environment variable validation
7. 🟡 Fix brand name inconsistency

### Long-term (This Month):
8. 🟢 Add automated tests
9. 🟢 Improve accessibility
10. 🟢 Add proper logging system

---

## 📞 Need Help?

If you need assistance with any of these issues:
1. Check the relevant `.md` guide files in the project root
2. Review Next.js 16 documentation
3. Check the email setup guides for SMTP configuration

---

**Report Generated:** ${new Date().toISOString()}
**Next Review:** Schedule monthly code reviews
