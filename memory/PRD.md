# Mount View Hotel Skardu - PRD

## Original Problem Statement
Build and enhance a website and portal for "Mount View Hotel Skardu" - a premium, tourism-focused hotel in Skardu, Gilgit-Baltistan. The project includes a React/Vite/TypeScript frontend with a Node.js/Express backend.

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion, Radix UI
- **Backend:** Node.js/Express (run via FastAPI proxy in server.py)
- **Data:** Mock data (localStorage) - no real DB yet

## What's Been Implemented

### Completed (Previous Sessions)
- Website migrated into environment with FastAPI proxy for Node.js
- Premium luxury theme with warm amber/slate color palette
- Home page with hero, features, rooms preview, location, facilities, CTA sections
- Booking & invoicing with logo/WiFi on printouts
- Guest history with CNIC, mobile, city fields
- Favicons and web manifest
- Open Graph meta tags for link previews
- Admin portal (FrontDesk, RestaurantPOS, Approvals)
- WhatsApp floating button
- Navbar + Footer layout

### Completed (Dec 7, 2025 - Current Session)
- **Premium Photo Gallery** - Fully implemented and tested (16/16 tests passed)
  - Front elevation hero image with gradient overlay and tags
  - 4 room cards grid: Room 103&104, Room 114 (Family Suite), Room 201&202, Room 207&209
  - Restaurant/Dining section with side-by-side layout
  - Lightbox modal with prev/next navigation
  - SEO-friendly alt text and captions for all images
  - Hover animations, responsive design (mobile stacking)
  - All data-testid attributes for testing

## Prioritized Backlog

### P1 - High Priority
- Complete SEO overhaul: individual room pages with dynamic routing (/rooms/[slug])
- SEO-friendly URLs, H1/H2 tags, intent-based descriptions per room
- Create dedicated Restaurant page content
- Create Transport & Tour Support page/section
- Add "Related Rooms" internal linking on room pages

### P2 - Medium Priority
- Migrate from mock data to real database (MongoDB available)
- Build backend API for CRUD operations (bookings, rooms, guests)
- Refactor frontend to fetch from backend API
- Centralize state management

### P3 - Low Priority
- Vercel deployment stabilization
- Clean up redundant deployment guide markdown files
- Performance optimization (image compression, lazy loading)

## Key Files
- `/app/frontend/src/components/PremiumGallery.tsx` - Photo gallery component
- `/app/frontend/src/pages/Home.tsx` - Main landing page
- `/app/frontend/src/lib/mock-data.ts` - All application data
- `/app/frontend/src/App.tsx` - Root component with routing
- `/app/frontend/public/gallery/` - Gallery images (6 files)
- `/app/backend/server.py` - FastAPI proxy for Node.js backend
