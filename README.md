# Buan Enterprise — Admin Dashboard

A fully responsive buan enterprise admin dashboard built with React, TypeScript, Tailwind CSS, Ant Design, Recharts, and Lucide icons.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx        ← Main shell (sidebar + topbar + outlet)
│   │   ├── Sidebar.tsx       ← Collapsible sidebar with nav items
│   │   └── Topbar.tsx        ← Header with notifications & user menu
│   ├── ui/                   ← REUSABLE components
│   │   ├── StatCard.tsx      ← KPI metric card
│   │   ├── StatusBadge.tsx   ← Colored status pill
│   │   ├── DataTable.tsx     ← Ant Design table wrapper with pagination
│   │   ├── PageHeader.tsx    ← Page title + search + action button
│   │   ├── ActionButtons.tsx ← Reusable action buttons (icon / button / accept-decline)
│   │   ├── Avatar.tsx        ← Avatar with fallback initials
│   │   └── Card.tsx          ← White rounded card container
│   └── charts/
│       └── Charts.tsx        ← UserGrowthChart + EarningsChart (Recharts)
├── pages/
│   ├── DashboardPage.tsx
│   ├── ShipmentsPage.tsx
│   ├── UsersPage.tsx
│   ├── HubsPage.tsx
│   ├── StaffPage.tsx
│   ├── PaymentsPage.tsx
│   ├── ReportsPage.tsx
│   ├── ProfileSettings.tsx
│   └── HubDetailsPage.tsx
├── data/
│   └── mockData.ts           ← All mock data in one place
├── types/
│   └── index.ts              ← TypeScript interfaces
└── App.tsx                   ← Router + Ant Design ConfigProvider
```

---

## 🎨 Customization Guide

### Change Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --primary: #2563eb;      /* Primary blue */
  --sidebar-bg: #0f172a;   /* Sidebar background */
  --content-bg: #f1f5f9;   /* Page background */
}
```
Also update `App.tsx` → `antTheme.token.colorPrimary`.

### Add a New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add nav item in `src/components/layout/Sidebar.tsx`

### Add a New Table Column
Edit the `columns` array in the relevant page file.

### Change Sidebar Nav Items
Edit the `navItems` array in `src/components/layout/Sidebar.tsx`.

### Swap Mock Data for Real API
Replace imports in each page from `../data/mockData` with your API calls or React Query hooks.

---

## 📦 Tech Stack

| Library | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Utility styling |
| Ant Design 5 | UI components (Table, Form, Select, etc.) |
| Recharts | Charts (Bar, Area) |
| Lucide React | Icons |
| React Router v6 | Client-side routing |
| Day.js | Date formatting |
