# Milestone — School Management Dashboard

A comprehensive web application for administering a private school: student and staff
records, academic structure, timetabling, attendance, grading, disciplinary incidents,
parent communication, and school finances — in a single role-aware dashboard with full
English/Arabic support.

Built with React 19, Redux Toolkit and Material UI against a Django REST Framework backend.

---

## Highlights

- **25 feature modules** covering the full school administration lifecycle
- **Role-based access control** for four user types, driving both navigation and per-page data flows
- **Bilingual (English / العربية)** with runtime RTL layout switching
- **Themeable UI** — two palettes (Default, Professional) × light/dark, persisted per user
- **JWT authentication** with automatic session rehydration and 401 auto-logout

---

## Features

### Academic
| Module | Description |
| --- | --- |
| School Structure | Study stages → grades → sections hierarchy with inline editing |
| Subjects | Subject catalogue mapped to grades |
| Study Years | Academic year definitions |
| Schedule | Weekly timetable grid, per grade and section, with period editing |
| Marks | Mark entry and performance management, scoped by role |
| Attendance | Daily attendance capture plus historical records, stats and recent-activity widgets |

### People
| Module | Description |
| --- | --- |
| Students | Registration form, searchable directory, and full student profile (personal, academic, parents, financial) |
| Staff | Multi-step employee creation wizard (personal info → work details → contract & schedule) and employee profiles |
| Placement Tests | Applicant placement test scheduling, results, and per-applicant profiles |
| Parent Visits | Visit date slots and parent visit request handling |
| Incidents | Disciplinary incident logging with stats and recent-incident widgets |

### Communication & Activities
| Module | Description |
| --- | --- |
| Posts | School announcement feed with comments |
| School Programs | Program definitions and management |
| School Activities | Extracurricular activity management |

### Finance
| Module | Description |
| --- | --- |
| Fees | Fee catalogue with installment support, filtering and sorting |
| Discounts | Percentage and fixed-value discounts |
| Fee Assignments | Assigning fees and discounts to individual students |
| Payments | Payment recording against a student's fee assignments |

---

## Roles & Permissions

Navigation and page behaviour adapt to the signed-in user's role:

| Role | Access |
| --- | --- |
| **Admin** | All modules; read-only on mark entry |
| **Teacher** | Students, subjects, study years, school structure, marks, incidents, attendance, placement — marks are scoped to the teacher's own assigned subjects and grades |
| **Cooperator** | Students, staff, schedule, school structure, marks, incidents, attendance, placement — marks traverse the full stage → grade → section → subject hierarchy |
| **Receptionist** | Students, staff, reports, school structure, marks, discounts, fees, incidents, attendance, placement |

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI | React 19, Material UI 7, Emotion, Lucide icons |
| State | Redux Toolkit (24 slices, 145 async thunks) |
| Routing | React Router 7 |
| HTTP | Axios with request/response interceptors |
| i18n | i18next + react-i18next, HTTP backend, browser language detection |
| Testing | Jest + React Testing Library |
| Tooling | Create React App (react-scripts 5) |

---

## Architecture

```
src/
├── api/            # 26 modules wrapping ~124 REST endpoints, all through apiService
│   └── apiService  # Axios instance: JWT injection + 401 auto-logout
├── featuers/       # 24 Redux Toolkit slices, one per domain
├── pages/          # 25 feature pages, each with local components/ and widgets/
├── components/     # Cross-page shared components (school structure selector, skeletons)
├── models/         # Domain model classes (Student, Post, Schedule, PlacementTest)
├── lib/            # Pure utilities (fee & discount calculations) — unit tested
├── services/       # i18n configuration
├── theme/          # Theme factory, palettes, and theme context provider
└── store/          # Root Redux store
```

Each feature follows the same vertical slice:

```
api/students.js  →  featuers/students-slice/  →  pages/student-management-page/
```

**Conventions**
- Every network call goes through `api/apiService.js`, never raw axios — this is what guarantees
  token attachment and consistent 401 handling.
- Data-heavy pages render a dedicated skeleton from `components/skeletons/` while loading,
  rather than a generic spinner.
- Page-local components live under `pages/<page>/components/`; only genuinely shared UI is
  promoted to top-level `components/`.
- User-facing strings go through `t()` — see `public/locale/{en,ar}/translation.json`.
  (Not yet universal; see the roadmap.)

---

## Getting Started

### Prerequisites
- Node.js 18+
- A running instance of the backend API

### Install

```bash
npm install
```

### Configure the API endpoint

Copy the example environment file and point it at your backend:

```bash
cp .env.example .env
```

```ini
REACT_APP_API_BASE_URL=http://localhost:8000/
```

If the variable is unset the app falls back to `http://localhost:8000/`. Create React App only
exposes variables prefixed with `REACT_APP_`, and the dev server must be restarted after any
change to `.env`.

### Run

```bash
npm start     # development server at http://localhost:3000
npm test      # test runner in watch mode
npm run build # production build to ./build
```

---

## API

The backend is namespaced into four areas:

| Namespace | Purpose |
| --- | --- |
| `/api/school/` | Academic domain — students, staff, subjects, structure, schedules, marks, attendance, incidents |
| `/api/accounting/` | Fees, discounts, fee assignments, payments |
| `/api/users/` | Authentication and user accounts |
| `/api/landingpage/` | Dashboard aggregate statistics |

Authentication is JWT-based. On login the access and refresh tokens are stored in
`localStorage` and re-attached to every subsequent request; a `401` response clears the
session and returns the user to the login page.

---

## Internationalization

Two locales ship with the app, each with 566 translation keys:

- `public/locale/en/translation.json` — English (LTR)
- `public/locale/ar/translation.json` — Arabic (RTL)

Switching language updates `document.dir`, `document.lang` and the body direction class at
runtime, so the entire layout mirrors without a reload. The selected language is cached in a
cookie and detected automatically on subsequent visits.

To add a locale: add an entry to `LANGUAGES` in [`src/services/i18n.js`](src/services/i18n.js)
and drop a matching `public/locale/<code>/translation.json`.

---

## Theming

`AppThemeProvider` exposes a `useTheme()` hook providing:

- `currentMode` / `switchMode` — light or dark
- `currentThemeName` / `switchTheme` — `default` or `professional` palette
- `getCurrentTheme()` — the resolved MUI theme object

[`src/theme/Theme.js`](src/theme/Theme.js) composes the two palettes against light/dark value
sets into four themes, layering on shared typography, a custom shadow ramp, and MUI component
overrides. Both selections persist to `localStorage`, so a user's appearance settings survive
a reload.

---

## Testing

```bash
npm test
```

33 passing unit tests cover the fee and discount calculation utilities in `src/lib/` —
percentage vs. fixed discounts, installment rounding, negative-balance guards, and validation.
Business logic that involves money lives in `src/lib/` specifically so it can be tested
independently of the UI.

**Known issue:** two suites (`src/App.test.js` and `src/api/__tests__/dashboard.test.js`)
currently fail to run. Both import modules that pull in axios v1, which ships ESM that Create
React App's Jest config does not transform (`Cannot use import statement outside a module`).
`src/App.test.js` is also leftover Create React App boilerplate asserting on a "learn react"
link that no longer exists. See the roadmap below.

---

## Roadmap

- [ ] Fix the axios ESM transform so API-layer tests run; remove the CRA boilerplate test
- [ ] Add component-level tests for the role-based flows in Marks and Attendance
- [ ] Complete i18n coverage — 9 pages still contain hardcoded English strings
      (Schedule, StudentForm, StaffForm, StudentManagement, PlacementTests, Reports, Classes, Courses)
- [ ] Add an error boundary and a 404 route
- [ ] Remove remaining debug `console.log` calls from request handlers
- [ ] Add screenshots to this README
