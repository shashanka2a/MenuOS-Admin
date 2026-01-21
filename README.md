
## MenuOS Admin – Next.js Admin Dashboard for Restaurants

MenuOS Admin is a **Next.js App Router**–based dashboard for restaurant owners.
It simulates a real SaaS product that digitizes a restaurant’s menu and provides a control panel for analytics, menu management, orders, staff, tables/QR, and settings.

---

### 1. Product concept & use case

**Who it’s for**

- Independent restaurants and small chains.
- Owners / managers who want:
  - A **digitized version of their menu** (for QR codes, web, kiosks, etc.).
  - A central **admin dashboard** for day‑to‑day operations.

**Core idea**

MenuOS takes an existing menu (PDF / images / delivery‑app links) and:

1. **Digitizes it once**, done by a human/AI “back office” to ensure:
   - No spelling mistakes.
   - Correct prices and categories.
   - Accurate dietary/availability attributes.
2. Provides an admin interface where the restaurant can:
   - Inspect analytics.
   - Manage menu items.
   - See recent orders.
   - Manage staff access and table QR codes.

> **Key UX principle:** onboarding should be extremely low‑friction.
> The restaurant mostly uploads or links an existing menu; MenuOS handles the heavy lifting.

---

### 2. End‑to‑end user journey

#### Routes

- `/` → redirects to `/login`.
- `/login` → dedicated **login screen** (sign‑in only).
- `/signup` → dedicated **signup screen** (sign‑up only).
- `/onboarding` → 3‑step onboarding wizard.
- `/dashboard` → main admin dashboard with sidebar navigation.

#### Login (`/login`)

- Email/password form with “Remember me”.
- On submit, navigates to `/dashboard` (demo only, no real auth backend).
- “Sign up” link sends users to `/signup`.

#### Signup (`/signup`)

- Collects:
  - Restaurant name
  - Email
  - Password + confirm password
- On submit, navigates to `/onboarding` to complete setup.

#### Onboarding (`/onboarding`)

Three steps:

1. **Basic Info**
   - Restaurant name
   - Location
   - Owner name
   - Phone number
2. **Menu Setup**
   - Option A: upload menu file (PDF/JPG/PNG).
   - Option B: provide a menu URL (DoorDash/UberEats/website).
3. **Tables & Capacity**
   - Number of tables.
   - Total seating capacity.
   - Summary card showing restaurant, location, and menu source.

Navigation is guarded so you can’t proceed until required fields are filled.
A visual progress indicator shows current step and completed steps.

##### Onboarding completion screen

After the last step, the wizard shows a **success screen**:

- Main message:
  - “Onboarding complete! Our team will reach out to you once your dashboard is ready.”
- Subtle explanation (core to the product):

> **We do a one‑time professional digitization of your menu to ensure 100% accuracy before going live.
> This usually takes up to 24 hours.**

- Primary CTA: **“Go to dashboard”** → navigates to `/dashboard`.

#### Dashboard (`/dashboard`)

The dashboard route renders:

- A **persistent sidebar layout** (`Layout`):
  - Collapsible sidebar.
  - Restaurant context (“The Bistro”).
  - Navigation items:
    - Dashboard
    - Analytics
    - Menu
    - Orders
    - Tables & QR
    - Settings
  - Theme toggle (light/dark).
  - Owner badge.

- A **dynamic main content area** controlled by local state:

  - `DashboardHome` – metrics and recent orders table.
  - `Analytics` – analytics view (charts/KPIs).
  - `MenuManagement` – rich interface for menu items:
    - Grid/list views.
    - Edit modal with image preview (using `next/image`).
  - `Orders`, `Staff`, `TablesQR`, `Settings` – additional operational surfaces.

All data is mock/sample data; in a real product it would be driven by backend APIs.

---

### 3. Tech stack & architecture

- **Framework**: Next.js 16 (App Router).
- **Language**: TypeScript.
- **Styling**:
  - Tailwind CSS v4 (design tokens + utilities).
  - Custom design system in `src/styles` and `src/components/ui`.
- **UI libraries**:
  - Radix UI primitives (`@radix-ui/react-*`).
  - `lucide-react` icons.
  - `embla-carousel-react`, `react-day-picker`, `react-hook-form`, `recharts`, `sonner`, etc.
- **Theming**:
  - Custom `ThemeContext` handling light/dark mode.
  - Persists theme to `localStorage` and toggles the `dark` class on `html`.
- **Images & assets**:
  - `next/image` with remote patterns for `images.unsplash.com`.
  - `public/icon.svg` used as the favicon (via Next metadata).

---

### 4. Project structure (high‑level)

- `app/`
  - `layout.tsx` – global layout, fonts, metadata (title, OG, icons).
  - `globals.css` – imports Tailwind styles from `src`.
  - `page.tsx` – redirects `/` to `/login`.
  - `login/page.tsx` – login route using `Auth` in locked signin mode.
  - `signup/page.tsx` – signup route using `Auth` in locked signup mode.
  - `onboarding/page.tsx` – onboarding wizard + success screen.
  - `dashboard/page.tsx` – dashboard shell + internal screen switching.
- `src/`
  - `context/ThemeContext.tsx` – theme state.
  - `components/Auth.tsx` – reusable auth component with `initialMode` and `lockMode`.
  - `components/Onboarding.tsx` – 3‑step wizard and completion view.
  - `components/Layout.tsx` – sidebar layout used on the dashboard.
  - `components/*` – feature components (analytics, menu, orders, staff, tables, settings).
  - `components/ui/*` – reusable UI primitives (button, input, dialog, etc.).
- `public/`
  - `icon.svg` – favicon.

---

### 5. Running the project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm start
```

By default, the app will be available at `http://localhost:3000`.

Recommended flows to explore:

1. `/signup` → complete signup → `/onboarding`.
2. Complete the onboarding steps → see success message and explanation.
3. Click **“Go to dashboard”** → explore `/dashboard` navigation, metrics, and menu management.
