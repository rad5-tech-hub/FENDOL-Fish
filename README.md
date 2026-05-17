# FENDOL Fish

Marketing and commerce site for FENDOL — a Nigerian fish processing and distribution brand. Built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- **Home** — hero, trust bar, about preview, featured products, 6-step process, why-choose grid, delivery model with regional timelines, testimonials, distributor CTA, newsletter
- **Products / Market** — catalog with search and category filters
- **Become a Distributor** — partnership models, earnings tiers, application form
- **Careers** — open positions, internships, CV upload
- **Order Tracking** — order ID lookup with shipment timeline
- **About, Recipes, Gallery, Contact** — supporting pages
- **WhatsApp floating button** — quick order channel on every page

## Run Locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Opens on [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start Vite dev server (port 3000)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — TypeScript type-check (`tsc --noEmit`)

## Project Structure

```
src/
  components/      Navbar, Footer, WhatsAppButton, ThemeContext
  pages/           Home, Market, ProductDetail, Checkout, About,
                   Distributors, Careers, OrderTracking,
                   Recipes, Gallery, Contact, Admin
  constants.ts     Product catalog
  types.ts         Shared TypeScript types
  index.css        Tailwind theme tokens (light + dark)
public/assets/     Logos and static images
```

## Tech Stack

- React 19 + React Router 7
- Vite 6
- Tailwind CSS 4
- Motion (Framer Motion successor)
- Lucide React icons
