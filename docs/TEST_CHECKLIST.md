# Manual acceptance checklist
Record actual pass/fail results; these tests have not been executed by the generator.

- [x] Clean schema import succeeds; six sample properties exist.
- [x] npm install and npm run build complete.
- [x] Listing shows six properties with images, city, rent and gender.
- [x] Narrow viewport (360px), tablet and desktop have no horizontal overflow.
- [x] City, min/max rent and gender filters work independently and together.
- [x] A nonexistent combination shows an empty state.
- [x] Filters update without document navigation (DevTools Network -> Fetch/XHR).
- [x] Register a unique email; reload and confirm the session persists.
- [x] Duplicate email, invalid phone and short password show errors.
- [x] Log out; incorrect credentials fail, correct credentials succeed.
- [x] Guest shortlist action prompts login; direct unauthenticated POST returns 401.
- [x] Save a property; UI updates without reload and survives refresh.
- [x] Save the same property repeatedly; only one interested_users row exists.
- [x] Remove a saved property; shortlist view removes it immediately.
- [x] A second account cannot see or modify the first account's shortlist.
- [x] Details show two gallery images, amenities, description and sample rating.
- [x] Detail-page save/remove updates without reload.
- [x] Invalid property ID returns HTTP 404.
- [x] Missing/incorrect CSRF token on a POST returns 403.
- [x] API errors and network failures produce a readable message.
- [x] With Network throttling enabled, capture loading and saving indicators.
- [x] After deployment, verify HTTPS, cookie flags, login and persistence again.

## Screenshots to submit
1. Listing on desktop and optionally mobile.
2. Property details with gallery and amenities.
3. AJAX filtering: visible filters/results plus DevTools Fetch/XHR.
4. AJAX shortlist before/after save, optionally with Network throttling.
Do not fabricate screenshots or show passwords/session tokens.
