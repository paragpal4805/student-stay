# StudentStay — Project report

## Project information

- Student name: PARAG PAL
- Project title: StudentStay — Student Accommodation Website
- Local development address: http://localhost:8000

## Objective
A responsive educational platform for students to explore PG accommodation, compare rent, filter listings, view property details and save a shortlist.

## Technology and architecture
HTML and Bootstrap provide the page structure and responsive layout. React renders the property listing, authentication forms and filters. JavaScript Fetch sends asynchronous requests to a PHP JSON API. PHP sessions identify signed-in users; MySQL persists properties and interests. The property details page is rendered by PHP from database records.

## Database design
The five required tables are users, properties, amenities, property_amenities and interested_users. A sixth table, property_images, supports an ordered multi-image gallery without putting repeated image fields in properties. Composite primary keys prevent duplicate amenity links and duplicate shortlist entries. Foreign keys maintain relationships. Prices use DECIMAL. All demonstration ratings are seeded values, not calculated reviews.

## Main workflows
1. A visitor applies city, minimum/maximum rent and gender filters.
2. React requests matching records and displays a loading state, results or errors.
3. A visitor registers or logs in.
4. A signed-in user saves/removes a property through an authenticated, CSRF-protected POST request.
5. The details page loads descriptions, amenities and image records from MySQL.

## Interface improvements
A clear hero section, responsive card grid, visible price labels, labelled filters, keyboard focus indicators, loading feedback, disabled save buttons during requests and explicit empty states improve usability. These are proposed design improvements, not results from user testing. Images are locally supplied SVG illustrations, not actual photographs.

## Security measures and limits
PDO bound parameters, password hashing/verification, session ID rotation after authentication, HttpOnly/SameSite cookies, CSRF tokens and escaped PHP output are included. React renders database strings as text. Server errors are logged rather than exposed through the API. Before a public production launch, add persistent login/signup rate limits, email verification, password recovery, monitoring, backups and a security review. This is a course project, not a production booking service.

## Scope exclusions
No booking, payment, landlord administration, uploads, maps, user reviews or verification of real accommodation. Property information is fictional.

## Submission details

- Live website URL: Pending — not deployed yet.
- GitHub repository URL: Pending — not uploaded yet.
- Local development address: http://localhost:8000
- Database schema: database/schema.sql
- Screenshots: screenshots/
- Testing results: See TEST_CHECKLIST.md and the testing summary below.

## Testing summary

Testing environment:
- Operating system: Windows
- Browser: Chrome
- PHP version: 8.2.12
- Local address: http://localhost:8000

| Feature | Status | Actual observation |
|---|---|---|
| Property listing | Passed | |
| City filter | Passed | |
| Budget filter | Passed | |
| Gender filter | Passed | |
| Signup | Passed | |
| Login and logout | Passed | |
| Save a property | Passed | |
| Remove a saved property | Passed | |
| Shortlist persists after refresh | Passed | |
| Property details | Passed | |
| AJAX filtering without page reload | Passed | |
| AJAX shortlisting without page reload | Passed | |
| Mobile layout | Not tested | |
| Live deployment | Pending | Not deployed yet. |