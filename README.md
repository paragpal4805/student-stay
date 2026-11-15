# StudentStay — step-by-step setup

A PHP/MySQL student accommodation application with React listings, Bootstrap styling, AJAX filtering, login/signup, shortlisting and PHP-rendered property details.

## 1. Install prerequisites
- PHP 8.1+ with pdo_mysql; MySQL 8+ (or a compatible local MySQL installation).
- Node.js 22.12+ and npm for the Vite build.
- A code editor; Git if you want to publish a repository.
- XAMPP is an optional way to run a local PHP/MySQL environment. If its database is MariaDB, verify the schema import on that installation.

## 2. Configure the database
Start your database service. From the project directory:

```sh
mysql -u root -p < database/schema.sql
```

Alternatively, import database/schema.sql in phpMyAdmin. The schema creates and selects student_stay. It is for a fresh installation and is NOT an idempotent migration; importing again fails on existing tables. Do not delete a database that contains data you need. Some hosts disallow CREATE DATABASE or USE; create a database in their control panel, remove those first two statements, and import into that database.

Copy config.example.php to config.php. Enter your local database hostname, port, name, username and password. Local root credentials are for development only. Use a dedicated restricted database user when deployed. Never commit config.php.

## 3. Build the frontend
From the project directory:

```sh
npm install
npm run build
```

This creates public/assets/app.js and public/assets/app.css. Commit the generated package-lock.json to make later installs reproducible; subsequent installs can use npm ci. Do not open index.php directly as a file.

## 4. Run locally
From the project directory:

```sh
php -S localhost:8000 -t public
```

Open http://localhost:8000. Register your own account: no seeded login/password is provided. The PHP built-in server is for development only. To rebuild automatically after frontend edits, use npm run watch in a second terminal.

## 5. Understand the implementation order
1. database/schema.sql: tables, foreign keys, sample records.
2. config.php and app/bootstrap.php: PDO connection, sessions, CSRF and shared helpers.
3. public/api.php: session, signup, login, logout, property filtering and interest endpoints.
4. src/main.jsx: React components and asynchronous data flow.
5. src/style.css: responsive presentation over Bootstrap.
6. public/property.php: PHP-rendered details, amenities and gallery.
7. public/detail.js: asynchronous details-page shortlisting.
8. docs/TEST_CHECKLIST.md: acceptance tests and screenshot instructions.

## 6. API reference
All endpoints are relative to the deployed application URL.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | api.php?action=session | Current user and CSRF token |
| GET | api.php?action=properties&city=Delhi&max=10000&gender=Male | Filtered properties |
| GET | api.php?action=properties&shortlist=1 | Current user's shortlist |
| POST | api.php?action=signup | name, email, password, phone |
| POST | api.php?action=login | email, password |
| POST | api.php?action=logout | empty object |
| POST | api.php?action=interest | property_id integer, interested boolean |

POST bodies must be JSON with Content-Type: application/json and X-CSRF-Token from the session endpoint. Interest uses an explicit desired state rather than an ambiguous toggle. Identity comes only from the PHP session, not a user ID in the request.

## 7. Test and capture screenshots
Use docs/TEST_CHECKLIST.md. In browser DevTools -> Network -> Fetch/XHR, apply a filter and save a property. The document should not reload. Use network throttling to make the loading indicator visible. Inspect MySQL interested_users to confirm persistence. Test with a second user as well.

## 8. Publish the repository
Run locally, review all files for secrets, then:

```sh
git init
git add .
git commit -m "Build StudentStay course project"
```

Create an empty repository in your GitHub account, then use the exact remote URL GitHub supplies:

```sh
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

These commands do not create the remote repository automatically. config.php, node_modules and built assets are ignored; source and package lock are what collaborators need to rebuild.

## 9. Deploy
Use a host that supports PHP, MySQL and HTTPS; static-only hosting cannot execute this PHP backend.

Preferred deployment layout:
- Upload app/ and config.php outside the public web root.
- Point the domain document root at this project's public/ directory.
- Build locally and upload public/ including generated assets/ and images/.
- Create a production database and restricted user, import the schema, then update config.php.
- Disable display_errors on the server; enable private error logs.
- Enable HTTPS and verify the session cookie is Secure and HttpOnly.
- If HTTPS terminates at a trusted reverse proxy, configure the server to expose the correct HTTPS state; do not blindly trust client-supplied forwarded headers.
- Do not deploy the PHP built-in development server as the public web server.

On shared hosting with a fixed public_html root, place app/ and config.php in its parent and copy the CONTENTS of public/ into public_html. The relative includes then still work. Never upload configuration or database dumps into a publicly downloadable directory. If your host cannot support this layout, adapt the include paths safely rather than exposing secrets.

Run the manual checklist again against the live URL. Add persistent rate limiting before opening signup/login to untrusted public traffic. No hosting account or GitHub resource is created by this archive.

## 10. Final submission
- Real working live project URL.
- Your GitHub repository URL.
- database/schema.sql.
- Actual listing, details and AJAX screenshots.
- docs/PROJECT_REPORT.md, updated with URLs and actual test outcomes.

## Troubleshooting
- Missing styles / blank listing: run npm run build, then check assets/app.js and app.css return HTTP 200. Check browser Console for JS errors.
- API server error: inspect PHP logs, config.php and pdo_mysql; verify the database is running and the schema was imported.
- Session expired: refresh the page to obtain the current CSRF token; allow cookies.
- No properties: reset filters; check the selected database contains seeded data.
- Secure cookies not sent locally: use ordinary local HTTP configuration, and check the PHP HTTPS server variable isn't incorrectly enabled.

## Limitations and verification status
Source files and archive are generated, but npm dependencies have not been installed here, PHP/MySQL have not been executed here, and no live deployment or browser test has been performed. Follow the setup and test checklist to verify on your machine. SVGs are original illustrative placeholders; replace them with licensed local property photos and update property_images if desired. Ratings are sample data, not user-generated reviews.
