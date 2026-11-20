# StudentStay

StudentStay is a PHP/MySQL student-accommodation application with React-based property listings, Bootstrap styling, AJAX filtering, login/signup, shortlisting, and PHP-rendered property-detail pages.

The project helps students browse accommodation, narrow results using filters, view property information, and maintain a shortlist.

## 1. Project Links

- Live website: https://studentstay-parag.wuaze.com/
- GitHub repository: https://github.com/paragpal4805/student-stay

The intended live domain is `studentstay-parag.wuaze.com`, not `studentstay.com`.

Before submission, confirm that the live URL opens this project and remains on the intended domain.

## 2. Project Objectives

- Build responsive property-listing and property-detail pages.
- Store accommodation information in a relational database.
- Retrieve and display information dynamically using PHP and MySQL.
- Support user registration, login, and logout.
- Allow users to add and remove properties from their shortlist.
- Apply filters and update shortlist state using asynchronous requests.
- Use React for the property-listing interface.
- Deploy the application to a live PHP/MySQL hosting environment.

## 3. Features

The application includes:

- Property listings with accommodation information.
- Filtering by city, maximum budget, and gender.
- Property-detail pages with descriptions, amenities, images, and ratings.
- User signup, login, and logout.
- User-specific property shortlisting.
- Asynchronous filtering and shortlist updates.
- Loading feedback during asynchronous operations.
- Responsive presentation for desktop and mobile screens.

See the verification section for the distinction between implemented functionality and completed manual tests.

## 4. Technology Stack

| Layer | Technologies |
|---|---|
| Page structure | HTML |
| Styling | CSS and Bootstrap |
| Browser interactions | JavaScript |
| Listing interface | React |
| Asynchronous communication | Fetch/AJAX |
| Backend | PHP and PDO |
| Database | MySQL or a compatible installation |
| Frontend build | Node.js, npm, and Vite |
| Hosting | InfinityFree |
| Version control | Git and GitHub |

## 5. Project Structure

The main source project uses the following important paths:

```text
student-stay/
├── app/
│   └── bootstrap.php
├── database/
│   └── schema.sql
├── docs/
│   ├── TEST_CHECKLIST.md
│   └── PROJECT_REPORT.md
├── public/
│   ├── index.php
│   ├── api.php
│   ├── property.php
│   ├── detail.js
│   ├── assets/
│   └── images/
├── src/
│   ├── main.jsx
│   └── style.css
├── config.example.php
├── config.php
├── package.json
└── README.md
```

`config.php` contains environment-specific configuration and must not be committed.

The `public/assets/` directory contains generated frontend assets after a successful build.

Submission files, such as screenshots and a structure-only database export, can be stored directly in the existing project folder. No additional submission folder is required.

## 6. Prerequisites

Install:

- PHP 8.1 or later with the `pdo_mysql` extension.
- MySQL 8 or a compatible database installation.
- Node.js 22.12 or later and npm for the Vite build.
- A code editor.
- Git for publishing the repository.

XAMPP is an optional local PHP/database environment. If it provides MariaDB, verify that the database script imports successfully on that installation.

## 7. Database Setup

### 7.1 Development setup script

The development database script is:

```text
database/schema.sql
```

It defines the database structure and includes sample records.

Start your database service, then run the following from the project directory:

```sh
mysql -u root -p < database/schema.sql
```

Alternatively, import `database/schema.sql` using phpMyAdmin.

The script creates and selects the `student_stay` database. Review the script before importing it.

This script is intended for a fresh installation. It is not an idempotent migration, and repeated imports can fail when tables already exist.

Do not delete or overwrite a database containing information you need.

Some hosting providers disallow `CREATE DATABASE` or `USE` statements. In that situation:

1. Create the database using the hosting control panel.
2. Make a host-specific copy of the import script.
3. Remove or adapt the database-creation and selection statements in that copy.
4. Select the correct database in phpMyAdmin.
5. Import the adapted script.

### 7.2 Database tables

The main tables are:

| Table | Purpose |
|---|---|
| `users` | User account information |
| `properties` | Accommodation information |
| `amenities` | Available amenity definitions |
| `property_amenities` | Relationships between properties and amenities |
| `interested_users` | Relationships between users and shortlisted properties |

Refer to the SQL file for the complete schema, additional tables, keys, and constraints.

### 7.3 Structure-only submission export

The structure-only export prepared for submission is:

```text
schema.sql
```

This file is stored in the project root and is separate from `database/schema.sql`.

- `schema.sql`: table definitions without saved table records.
- `database/schema.sql`: development setup script with sample data.

A structure-only import does not populate accommodation listings. Use the reviewed development setup script when sample data is needed.

Confirm that the root `schema.sql` file has been copied into this repository before submission.

## 8. Application Configuration

Copy:

```text
config.example.php
```

to:

```text
config.php
```

Enter the database configuration expected by the application:

- Hostname.
- Port.
- Database name.
- Username.
- Password.

Use local development credentials only in your local environment.

For deployment, use the database credentials supplied for the hosting environment and the least privileges supported by that environment.

Never commit real database credentials, session secrets, or other sensitive configuration.

## 9. Build the Frontend

From the project directory, run:

```sh
npm install
npm run build
```

The build generates:

```text
public/assets/app.js
public/assets/app.css
```

Commit `package-lock.json` when it is present.

For later installations with an existing lockfile, use:

```sh
npm ci
npm run build
```

Do not open PHP files directly using a `file://` URL. Run the application through a PHP-capable server.

If the project defines a `watch` script in `package.json`, rebuild automatically during frontend development using:

```sh
npm run watch
```

## 10. Run Locally

From the project directory, run:

```sh
php -S localhost:8000 -t public
```

Open:

```text
http://localhost:8000
```

Register your own account. No seeded login/password is provided.

The PHP built-in server is for local development only and is not the production deployment server.

## 11. Project Approach

StudentStay separates the browser interface, PHP backend, and MySQL database.

### Frontend

React provides the property-listing interface.

JavaScript sends asynchronous requests to the backend to retrieve filtered properties and update shortlist state without a full page reload.

Bootstrap and custom CSS provide the responsive presentation.

### Backend

PHP handles:

- Database access through PDO.
- Session-based authentication.
- Signup, login, and logout.
- Property filtering.
- Shortlist updates.
- Property-detail rendering.
- Shared validation and request-handling helpers.

### Database

MySQL stores users, properties, amenities, and relationships between them.

Relationship tables connect properties to amenities and users to shortlisted properties.

### Property details

Property-detail pages are rendered using PHP.

JavaScript provides asynchronous shortlist interaction on the detail page.

## 12. Implementation Guide

The main implementation files are:

1. `database/schema.sql` — database tables, foreign keys, and sample records.
2. `config.php` — environment-specific configuration.
3. `app/bootstrap.php` — PDO connection, sessions, CSRF handling, and shared helpers.
4. `public/api.php` — session, authentication, property filtering, and interest endpoints.
5. `src/main.jsx` — React components and asynchronous data flow.
6. `src/style.css` — responsive styling.
7. `public/property.php` — PHP-rendered property information.
8. `public/detail.js` — asynchronous property-detail shortlisting.
9. `docs/TEST_CHECKLIST.md` — manual acceptance tests and screenshot guidance.

## 13. API Reference

Endpoints are relative to the application's public base URL.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `api.php?action=session` | Retrieve current user and CSRF token |
| GET | `api.php?action=properties&city=Delhi&max=10000&gender=Male` | Retrieve filtered properties |
| GET | `api.php?action=properties&shortlist=1` | Retrieve the current user's shortlist |
| POST | `api.php?action=signup` | Register using name, email, password, and phone |
| POST | `api.php?action=login` | Authenticate using email and password |
| POST | `api.php?action=logout` | End the current session |
| POST | `api.php?action=interest` | Set interest using `property_id` and `interested` |

POST requests use JSON bodies with:

```text
Content-Type: application/json
X-CSRF-Token: TOKEN_FROM_SESSION_ENDPOINT
```

The interest endpoint accepts an explicit desired state rather than an ambiguous toggle.

User identity comes from the PHP session, not from a user ID supplied in the request body.

## 14. Manual Testing

Use:

```text
docs/TEST_CHECKLIST.md
```

Check the following:

### General functionality

- Homepage opens.
- Listings display.
- Images and styles load.
- Filters return the expected results.
- Property-detail pages show the selected property's information.

### Authentication

- A new user can register.
- A registered user can log in.
- Invalid login attempts are handled.
- Logout ends the session.

### Shortlisting

- A logged-in user can add a property.
- A logged-in user can remove a property.
- Shortlist state persists as intended.
- One user's shortlist does not appear as another user's shortlist.

### AJAX behaviour

- Filtering updates the interface without a full page reload.
- Shortlist changes update the interface without a full page reload.
- Loading feedback appears during requests.
- Failed requests provide appropriate feedback.

### Mobile behaviour

- The layout fits the screen.
- The menu works.
- Controls remain usable.
- Property-detail pages open correctly.

### Deployment access checks

- The homepage remains publicly accessible.
- Direct access to private configuration and application files is blocked.
- No database dumps or private credentials are publicly downloadable.

Record actual outcomes rather than assuming a test passed because the homepage loaded.

## 15. Required Screenshots

Save actual screenshots of the completed application.

### Property listing

Filename:

```text
property-listing.png
```

Show the listing interface, property cards, and relevant filter controls.

### Property details

Filename:

```text
property-detail.png
```

Show a selected property's information.

### AJAX interaction

Filename:

```text
ajax-interaction.png
```

Capture filtering or shortlisting with the resulting interface update.

For stronger supporting evidence:

1. Open browser Developer Tools.
2. Select Network.
3. Filter by Fetch/XHR.
4. Clear previous requests.
5. Apply a filter or update a shortlist.
6. Capture the resulting request and interface update.

A screenshot alone does not prove that a full page reload was avoided. Explain the action and observed result in the project report.

Do not include cookies, authentication tokens, passwords, or private user data in screenshots.

## 16. Publish to GitHub

Use the existing main `student-stay` folder. A second local project folder is not required.

### 16.1 Review files first

Before staging files:

- Exclude the real `config.php`.
- Review other files for credentials.
- Exclude `node_modules/`.
- Review database exports for private records.
- Review screenshots for sensitive information.
- Include `config.example.php` with placeholder values only.
- Include `package-lock.json` when present.

Check the existing `.gitignore` rather than assuming exclusions are configured.

If generated frontend assets are excluded, collaborators must run the frontend build.

If secrets were previously committed, adding them to `.gitignore` does not remove them from repository history. Address the exposure before publishing.

### 16.2 Check whether Git is already configured

Run:

```sh
git status
git remote -v
```

If the folder is not a Git repository, initialize it:

```sh
git init
```

If it is already a repository, inspect its existing configuration before proceeding.

### 16.3 Stage and commit

Run:

```sh
git add .
git status
```

Review the staged files before committing.

Then run:

```sh
git commit -m "Prepare StudentStay project for submission"
```

### 16.4 Create the remote repository

Create an empty repository in your GitHub account.

For this existing-project workflow, do not initialize the remote with another README, license, or `.gitignore`.

For a new local repository with no existing remote, run:

```sh
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_REPOSITORY_URL` with the exact URL GitHub provides.

These commands do not create the GitHub repository automatically.

If an `origin` remote already exists, verify it instead of adding or replacing it blindly. Do not use force-push to bypass an unexplained error.

After publishing:

1. Open the repository in a browser.
2. Confirm the required files are present.
3. Confirm real credentials are absent.
4. Update the repository link in this README.
5. Ensure the evaluator can access the repository.

## 17. Deployment

The application requires hosting that supports PHP and MySQL.

Static-only hosting cannot execute its PHP backend.

### 17.1 Preferred deployment layout

Where supported:

- Keep `app/` and `config.php` outside the public web root.
- Point the domain document root to `public/`.
- Build the frontend locally.
- Upload the public files, generated assets, and images.
- Create the production database.
- Import the appropriate database script.
- Configure the production database connection.
- Enable HTTPS.
- Disable public error display.
- Use private error logging where the hosting service supports it.
- Verify session-cookie settings in the deployed environment.

Do not deploy the PHP built-in development server as the public server.

If HTTPS terminates at a trusted reverse proxy, configure HTTPS detection for that environment. Do not blindly trust client-supplied forwarded headers.

### 17.2 InfinityFree deployment used for this project

Live address:

```text
[https://studentstay-parag.wuaze.com/](https://studentstay-parag.wuaze.com/)
```

The hosting-specific deployment copy uses:

```text
htdocs/
├── .htaccess
├── config.php
├── app/
│   ├── .htaccess
│   └── bootstrap.php
└── public/
    ├── index.php
    ├── api.php
    ├── property.php
    ├── detail.js
    ├── assets/
    └── images/
```

The root `.htaccess` provides the routing and access restrictions required by this deployment layout.

This differs from the preferred layout because private files remain within the hosting document tree and rely on server access restrictions.

During manual testing:

```text
/config.php
/app/bootstrap.php
```

both returned:

```text
403 Forbidden
```

These are checks of specific paths, not a comprehensive security audit.

Do not copy this layout to another server without checking the routing and access rules for that environment.

Do not upload SQL exports, private backups, or submission documents to the public website unnecessarily.

The main source project and the hosting-specific deployment copy can remain separate. The GitHub repository does not need to include a second deployment folder.

### 17.3 Before wider public use

- Repeat the manual tests against the live deployment.
- Verify authentication and user-data separation.
- Review session and CSRF behaviour.
- Add persistent rate limiting for public authentication endpoints.
- Review server configuration and private-file access restrictions.
- Confirm that public error display is disabled.
- Confirm that no credentials are exposed in the repository or website.

## 18. Final Submission

Provide:

1. Live project URL:

   ```text
   https://studentstay-parag.wuaze.com/
   ```

2. GitHub repository URL:

   ```text
   REPLACE_WITH_YOUR_ACTUAL_REPOSITORY_URL
   ```

3. Database schema:

   ```text
   schema.sql
   ```

   This is the structure-only export in the project root.

   The development setup script with sample data remains:

   ```text
   database/schema.sql
   ```

4. Screenshots:

   ```text
   property-listing.png
   property-detail.png
   ajax-interaction.png
   ```

5. Brief project explanation:

   ```text
   docs/PROJECT_REPORT.md
   ```

   Update the report with the actual links, implementation details, screenshots, test outcomes, and limitations.

   If the submission permits the README to serve as the brief document, this README can be used instead.

Confirm that every listed submission file exists before submitting. Follow the course instructions if a PDF, Word document, or different submission format is required.

## 19. Troubleshooting

### Missing styles or blank listing interface

Run:

```sh
npm run build
```

Then check:

- `assets/app.js` loads successfully.
- `assets/app.css` loads successfully.
- The browser Console does not show JavaScript errors.
- The generated asset paths match the deployment layout.

### API server error

Check:

- Database configuration.
- Database availability.
- The `pdo_mysql` extension.
- Whether the required schema has been imported.
- PHP error information available in the hosting environment.

Do not leave sensitive debugging output publicly visible.

### Session expired

- Refresh the page to obtain the current CSRF token.
- Allow the cookies required by the application.
- Check the request's session and CSRF handling.

### No properties appear

- Reset filters.
- Confirm that the application selects the intended database.
- Confirm that property records exist.
- Remember that the structure-only export does not contain sample records.

### Secure cookies are not sent during local development

Use the intended local HTTP configuration and verify that HTTPS detection is not incorrectly enabled for local requests.

### The wrong website opens

The intended address is:

```text
[https://studentstay-parag.wuaze.com/](https://studentstay-parag.wuaze.com/)
```

Open it directly in an Incognito window.

If the address changes to `studentstay.com`, record whether the change happens immediately or after clicking a particular link.

Check the relevant application links and redirect configuration before changing the deployment.

## 20. Verification Status

### Reported passing manual checks

The following checks were reported as passing during project testing:

| Check | Reported result |
|---|---|
| Main website opens | Passed |
| Mobile layout fits the screen | Passed |
| Mobile menu works | Passed |
| Property-detail page opens on mobile | Passed |
| Search and filtering | Passed |
| Direct access to `/config.php` | Blocked with 403 |
| Direct access to `/app/bootstrap.php` | Blocked with 403 |

These results describe manual checks at the time of testing. They do not guarantee future availability or complete application security.

### Items requiring final confirmation

Before submission:

- Recheck the live URL because a later wrong-domain navigation issue was reported.
- Record signup, login, and logout results.
- Record shortlist addition and removal results.
- Verify shortlist persistence.
- Verify data separation between two users.
- Capture the AJAX interaction evidence.
- Verify a fresh setup using the repository instructions.
- Confirm that the repository and report contain no real credentials.
- Replace all submission placeholders.

Update this section as those checks are completed.

## 21. Known Limitations

- Ratings are sample data rather than user-generated reviews.
- Supplied SVG property illustrations are placeholders if still in use.
- Replace placeholder illustrations with appropriately licensed images where required.
- Manual functional testing is not a comprehensive security audit.
- Public production use requires further operational and security review.

Document any additional incomplete requirements or known issues honestly. Keep future improvements separate from completed features.