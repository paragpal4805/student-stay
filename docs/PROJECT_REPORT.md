# StudentStay — Project Report

## 1. Project Information

- Student name: PARAG PAL
- Project title: StudentStay — Student Accommodation Website
- Local development address: http://localhost:8000
- Live website: https://studentstay-parag.wuaze.com/
- GitHub repository: https://github.com/paragpal4805/student-stay
- Hosting platform: InfinityFree

## 2. Project Objective

StudentStay is an educational student-accommodation application.

It allows users to explore PG accommodation, compare listed rent,
filter properties, view detailed accommodation information, and
maintain a shortlist.

The project demonstrates responsive interface development,
relational database design, PHP backend integration, React
components, and asynchronous browser interactions.

It is a course project rather than a production booking service.

## 3. Technology Stack

| Area | Technology |
|---|---|
| Page structure | HTML |
| Responsive styling | Bootstrap and CSS |
| Browser interactions | JavaScript |
| Listing interface | React |
| Asynchronous requests | Fetch/AJAX |
| Backend | PHP |
| Database access | PDO |
| Database | MySQL or a compatible installation |
| Frontend build | Vite, Node.js, and npm |
| Version control | Git and GitHub |
| Deployment | InfinityFree |

## 4. Application Architecture

StudentStay separates the browser interface, PHP backend, and
database.

### Frontend

React renders the property-listing interface, authentication
forms, and filter controls.

JavaScript Fetch sends asynchronous requests to the PHP API.
The interface displays loading feedback, results, empty states,
or errors according to the request outcome.

Bootstrap and custom CSS provide the responsive layout.

### Backend

The PHP API handles authentication, property retrieval,
filtering, and shortlist updates.

PHP sessions identify the signed-in user.

The property-detail page is rendered by PHP using information
retrieved from the database.

### Database

The database stores user accounts, properties, amenities,
property images, and shortlist relationships.

The browser does not connect directly to MySQL. Database
operations are performed through the PHP backend.

## 5. Database Design

The project uses the following tables:

| Table | Purpose |
|---|---|
| users | Stores user account information |
| properties | Stores accommodation information |
| amenities | Stores amenity definitions |
| property_amenities | Links properties to their amenities |
| interested_users | Links users to shortlisted properties |
| property_images | Stores image records for property galleries |

### Design Approach

- Separate tables avoid repeated amenity and image fields in
  the properties table.
- Composite primary keys prevent duplicate amenity links and
  duplicate shortlist entries.
- Foreign keys maintain relationships between related records.
- Prices use DECIMAL.
- Property images can be ordered for gallery presentation.
- Demonstration ratings are seeded values, not calculated
  user reviews.

### Database Files

The repository uses two SQL files for different purposes:

- `database/schema.sql`:
  The development setup script, including sample data.

- `schema.sql`:
  The structure-only database export prepared for submission,
  stored in the project root.

A structure-only import creates the schema but does not populate
the application with sample accommodation records.

The exported schema should be reviewed before submission to
confirm that it includes the intended tables, keys, and
relationships without private user data.

## 6. Main User Workflows

### 6.1 Browse and Filter Properties

1. A visitor opens the property-listing page.
2. The visitor chooses the available city, rent, or gender
   filters.
3. React requests matching records from the PHP API.
4. The interface displays a loading state while waiting.
5. Matching properties, an empty state, or an error message
   appears.

### 6.2 Register and Sign In

1. A visitor opens the signup or login interface.
2. The visitor submits the required information.
3. The backend validates the request.
4. Successful authentication creates or updates the user's
   session.
5. The interface reflects the signed-in state.

### 6.3 Add or Remove a Shortlisted Property

1. A signed-in user selects the interest or shortlist control.
2. JavaScript sends an authenticated, CSRF-protected POST
   request.
3. The backend updates the relevant relationship.
4. The interface updates without a full page reload.

### 6.4 View Property Details

1. A visitor selects a property.
2. PHP retrieves the selected property's database records.
3. The page displays the available description, amenities,
   images, rent, and other accommodation information.

## 7. AJAX Implementation

AJAX is used to perform supported actions without reloading
the complete page.

The main examples are:

- Applying property filters.
- Adding a property to the shortlist.
- Removing a property from the shortlist.

The frontend sends requests using Fetch and processes the
JSON responses returned by the PHP API.

Loading feedback and temporarily disabled controls help
communicate that a request is in progress.

### Verification Method

AJAX behaviour can be checked using browser Developer Tools:

1. Open the Network panel.
2. Select the Fetch/XHR filter.
3. Clear previous requests.
4. Apply a property filter or update the shortlist.
5. Confirm that a request is sent.
6. Confirm that the interface updates without a full
   document reload.

The submission screenshot should show the relevant interaction
and resulting interface state.

A static screenshot alone does not prove that a full page
reload was avoided.

## 8. Interface and Responsive Design

The interface uses:

- A clear introductory section.
- Responsive property cards.
- Visible rent information.
- Labelled filter controls.
- Keyboard focus indicators.
- Loading feedback.
- Disabled save controls while requests are pending.
- Explicit empty states.

These design choices are intended to improve usability.
They are not presented as findings from a formal user study.

The supplied SVG images are illustrative placeholders rather
than photographs of real accommodation.

### Reported Mobile Results

The following checks were reported as passing on a phone:

- The layout fits the screen.
- The mobile menu works.
- Property-detail pages open successfully.

## 9. Security Measures and Limitations

The implementation is designed to use:

- PDO bound parameters for database queries.
- Password hashing and verification.
- Session ID rotation after authentication.
- HttpOnly and SameSite session-cookie settings.
- CSRF tokens for state-changing requests.
- Escaped PHP output.
- React text rendering for database strings.

These describe the implementation approach. Their presence
does not establish that the application has undergone a
comprehensive security audit.

Production configuration should keep sensitive error details
out of public responses.

### Deployment Access Checks

During manual testing:

| Requested path | Reported response |
|---|---|
| `/config.php` | 403 Forbidden |
| `/app/bootstrap.php` | 403 Forbidden |

The public homepage remained accessible during those checks.

These results confirm denial of direct access to those
specific paths at the time of testing. They do not establish
complete application security.

### Further Work Before Production Use

- Persistent login and signup rate limiting.
- Email verification.
- Password recovery.
- Monitoring.
- Backup and recovery procedures.
- Review of session and cookie configuration.
- A broader application and hosting security review.

Real database credentials must not be committed to GitHub
or included in screenshots.

## 10. Deployment

The application has been deployed to InfinityFree.

Live website:

https://studentstay-parag.wuaze.com/

The hosting-specific deployment copy uses this layout:

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

The root routing and private-file access restrictions depend
on the deployment's `.htaccess` configuration.

The main source project is maintained separately from this
hosting-specific deployment copy.

### Final URL Verification

A later report indicated that opening the project address
might lead to `studentstay.com`.

The intended project domain is:

```text
studentstay-parag.wuaze.com
```

Before final submission, recheck that:

1. The exact live URL opens this project.
2. The browser remains on the intended domain.
3. Navigation links do not unexpectedly open the other domain.

Update this subsection with the actual result after the
issue has been checked and, if necessary, corrected.

## 11. Testing Environment

### Local Environment

- Operating system: Windows
- Browser: Chrome
- PHP version recorded for local testing: 8.2.12
- Local address: http://localhost:8000

### Hosted Environment

- Hosting provider: InfinityFree
- Live address: https://studentstay-parag.wuaze.com/
- Mobile testing: Performed on a phone

The local PHP version is not a claim about the PHP version
running on the hosting server.

## 12. Testing Summary

The following statuses record the student's reported manual
test results. They are not independent or automated verification.

| Feature | Reported status | Test note |
|---|---|---|
| Property listing | Passed | Reported as passing in the project test summary |
| City filter | Passed | Reported as passing in the project test summary |
| Budget filter | Passed | Reported as passing in the project test summary |
| Gender filter | Passed | Reported as passing in the project test summary |
| Signup | Passed | Reported as passing in the project test summary |
| Login and logout | Passed | Reported as passing in the project test summary |
| Save a property | Passed | Reported as passing in the project test summary |
| Remove a saved property | Passed | Reported as passing in the project test summary |
| Shortlist persists after refresh | Passed | Reported as passing in the project test summary |
| Property details | Passed | Property-detail pages were reported to open |
| AJAX filtering without page reload | Passed | Reported as passing; include supporting capture |
| AJAX shortlisting without page reload | Passed | Reported as passing; include supporting capture |
| Mobile layout | Passed | Layout fits the phone screen |
| Mobile menu | Passed | Menu was reported to work |
| Property details on mobile | Passed | A property could be opened on the phone |
| Direct access to `/config.php` | Passed | Returned 403 Forbidden |
| Direct access to `/app/bootstrap.php` | Passed | Returned 403 Forbidden |
| Live deployment | Deployed; final URL recheck required | Homepage previously opened; later wrong-domain report needs confirmation |
| Shortlist separation between users | Passed | User A's shortlist was not visible to User B; each account retained its own saved properties |
| Fresh installation from repository | Passed | Created a separate test database, imported database/schema.sql, installed dependencies, built the frontend, started the local PHP server, and confirmed the listed features worked |

Only retain a Passed status when the corresponding test
was actually completed.

For detailed test procedures, see:

```text
docs/TEST_CHECKLIST.md
```

From this report's location inside `docs/`, the checklist is:

[Manual test checklist](TEST_CHECKLIST.md)

## 13. Submission Screenshots

The following screenshots should be saved in the project root.

### 13.1 Property Listing Page

Filename:

```text
property-listing.png
```

Show the property cards and relevant listing controls.

![Property listing page](../property-listing.png)

### 13.2 Property Detail Page

Filename:

```text
property-detail.png
```

Show the selected property's information.

![Property detail page](../property-detail.png)

### 13.3 AJAX-Based Interaction

Filename:

```text
ajax-interaction.png
```

Show filtering or shortlisting and the resulting interface
update. Include the relevant Fetch/XHR request where practical.

![AJAX interaction](../ajax-interaction.png)

Confirm that all three files exist before submitting.
Do not include credentials, cookies, or authentication tokens.

## 14. Scope Exclusions

The project does not provide:

- Accommodation booking.
- Payment processing.
- Landlord administration.
- User file uploads.
- Map integration.
- User-generated reviews.
- Verification of real accommodation.

Property information is fictional and intended for
demonstration.

## 15. Final Deliverables

| Deliverable | Location or value |
|---|---|
| Live project URL | https://studentstay-parag.wuaze.com/ |
| GitHub repository | REPLACE_WITH_YOUR_ACTUAL_REPOSITORY_URL |
| Structure-only database schema | `schema.sql` in the project root |
| Development setup script | `database/schema.sql` |
| Property-listing screenshot | `property-listing.png` in the project root |
| Property-detail screenshot | `property-detail.png` in the project root |
| AJAX screenshot | `ajax-interaction.png` in the project root |
| Brief project document | `docs/PROJECT_REPORT.md` |
| Setup instructions | `README.md` |

## 16. Final Submission Checklist

- [ ] Replace the GitHub repository placeholder.
- [ ] Recheck the live website and intended domain.
- [ ] Confirm the repository is accessible to the evaluator.
- [ ] Confirm that real credentials are not published.
- [ ] Confirm that the root `schema.sql` contains the intended structure-only export.
- [ ] Confirm that README database instructions match the actual SQL files.
- [ ] Save and verify the three screenshots.
- [ ] Confirm that screenshot links render in this report.
- [ ] Record the two-user shortlist test.
- [ ] Record the fresh-installation test.
- [ ] Update unresolved issues with their actual outcomes.
- [ ] Commit and push the completed submission files.

## 17. Conclusion

StudentStay demonstrates a student-accommodation browsing
workflow using React, PHP, MySQL, and asynchronous requests.

The project combines property listings, filtering,
authentication, shortlisting, property-detail rendering,
and responsive presentation.

It has been deployed and manually tested, with final
submission checks and any unresolved issues documented
above. It remains an educational application rather than
a production accommodation or booking platform.