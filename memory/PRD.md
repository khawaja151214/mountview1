# Mount View Hotel Skardu - PRD

## Original Problem Statement
Build and enhance a website and portal for "Mount View Hotel Skardu" - a premium, tourism-focused hotel. Includes SEO optimization, theme redesign, AI chatbot, and booking system.

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js/Express (via FastAPI proxy) + FastAPI for chat endpoint
- **AI:** OpenAI gpt-4o-mini via Emergent LLM key (emergentintegrations)
- **Data:** Mock data (localStorage) - no real DB yet

## What's Been Implemented

### Phase 1 - Gallery & Foundation (Previous)
- Premium photo gallery with 5 rooms + restaurant + hotel exterior
- Room number labels, lightbox modal, responsive design
- Favicons, web manifest, Open Graph tags

### Phase 2 - SEO & Theme Overhaul (Feb 7, 2025)
- **New Color Palette:** Deep emerald (#0E2F2F), warm beige (#F2E8D5), elegant gold (#C4A24C)
- **SEO Meta Tags:** Title targeting "Best Hotel in Skardu", 155-char description, full keyword list
- **Hotel Schema Markup:** JSON-LD with address, coordinates, amenities, star rating, pricing
- **FAQ Schema:** 4 FAQ items for rich snippets
- **SEO H1:** "Best Hotel in Skardu - Luxury 3 Star & 5 Star Comfort"
- **7 SEO H2 sections** targeting: best hotel, 3-star/5-star, near airport, near Deosai, luxury, family, affordable
- **New sections:** Animated counters, guest reviews with stars, FAQ accordion, Google Map embed, video section
- **Sticky buttons:** WhatsApp only (bottom-right), Chatbot (bottom-left)
- **Single booking CTA:** WhatsApp only — no redundant "Book Now" buttons

### Phase 3 - AI Chatbot (Feb 7, 2025)
- **Backend:** POST /api/chat endpoint using OpenAI gpt-4o-mini
- **System prompt:** Trained with hotel facts (prices, distances, facilities, tourism)
- **Session management:** UUID-based, persistent conversations
- **Frontend:** ChatBot.tsx component with emerald/beige/gold theme
- **Safety:** Never fabricates info, falls back to reception contact on errors
- **Testing:** 100% pass rate (17 frontend + 8 backend tests)

## Prioritized Backlog

### P1 - High Priority
- Individual room pages with dynamic routing (/rooms/[slug])
- Restaurant page content enhancement
- Transport & Tour Support page

### P2 - Medium Priority
- Migrate from mock data to MongoDB backend
- Build backend CRUD API for bookings/rooms/guests
- Vercel deployment stabilization

### P3 - Low Priority
- Image compression & lazy loading optimization
- PageSpeed 90+ target
- Centralized state management

## Key Files
- `/app/frontend/src/pages/Home.tsx` - Main landing page with all SEO sections
- `/app/frontend/src/components/ChatBot.tsx` - AI chatbot component
- `/app/frontend/src/components/PremiumGallery.tsx` - Photo gallery
- `/app/frontend/src/components/layout/PublicLayout.tsx` - Navbar & Footer
- `/app/frontend/src/index.css` - Theme variables and animations
- `/app/frontend/index.html` - Meta tags, Hotel + FAQ schemas
- `/app/backend/server.py` - FastAPI proxy + /api/chat endpoint
- `/app/frontend/src/lib/mock-data.ts` - All room/hotel data
