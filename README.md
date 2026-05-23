# FYN Mobility — India's EV Supply Ecosystem Homepage

A complete premium redesign and rebuild of the **Fyn Mobility** homepage, shifting the company's positioning from a fleet logistics provider to **"India's EV Supply Ecosystem"**.

This production-ready Next.js 15 application features a highly responsive, modern, dark-first tech aesthetic with custom operational UI components, real-time telemetry metrics, automated tabbed forms, high-agency career boards, and a responsive chatbot assistant.

---

## 🚀 Key Features

* **Control-Room Fleet Dashboard**: The `Fleet & Impact` section represents an EV operations control center. It includes client-side rendered Recharts area telemetry charts, animated metric counters, and live telemetry log ticking streams.
* **Secured AI Operations Chatbot**: A bottom-right floating AI chat assistant that reads `process.env.NEXT_PUBLIC_CHAT_API_KEY`, supporting predefined quick prompts, keyword searches, and instant redirect links to Refynd, INFYNITY, Careers, and Contact.
* **Interactive Onboarding Telemetry forms**: 5 high-agency tabbed onboarding forms (Invest in Fyn, Enterprise Clients, Refynd Partner, INFYNITY Partner, and Drive with Fyn) equipped with robust client-side validation and responsive transmission states.
* **Scalable Partner Graphic Badge System**: Typography-driven responsive gradients that ensure logo assets scale without breaking, using negative logo rendering under dark conditions.
* **Complete Modular Structure**: Built with clean, centralized static data models (`/src/data`) separated from presentation components to support easy future copy updates.

---

## 🛠️ Technology Stack

* **Core Framework**: [Next.js 15](https://nextjs.org/) (App Router & React 19)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Visualizations**: [Recharts](https://recharts.org/)
* **Class Mergers**: `clsx` & `tailwind-merge`

---

## 📂 Required Project Structure

```bash
src/
├── app/
│   ├── page.tsx          # Main entry assembly containing all 18 sections
│   ├── layout.tsx        # Barlow font loader, metadata & global chatbot provider
│   └── globals.css       # Tailwind layers, dark scrollbars, custom gradients
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    # Glassmorphic navbar with mobile Drawer overlay
│   │   └── Footer.tsx    # Structured sitemap, operations HQ & social indices
│   │
│   ├── sections/
│   │   ├── Hero.tsx      # Cinematic dark headline and active EV counters
│   │   ├── About.tsx     # Narrative detailing corporate transition
│   │   ├── VisionMission.tsx
│   │   ├── Ecosystem.tsx # Dynamic interactive relationship visualizer
│   │   ├── WhatWeDo.tsx  # OEM client logistics (Porter, Delhivery, Uber)
│   │   ├── Platforms.tsx # OptiFyn suite dashboard overview
│   │   ├── Refynd.tsx    # Commercial leasing models
│   │   ├── Infynity.tsx  # Driver community app and play store links
│   │   ├── FleetImpact.tsx # EV control dashboard with telemetry logs and AreaChart
│   │   ├── ClientsPartners.tsx
│   │   ├── Investors.tsx
│   │   ├── Leadership.tsx  # Dynamic avatar badges for team card scalability
│   │   ├── Media.tsx     # Horizontal marquee ticks and video interviews
│   │   ├── GetInvolved.tsx # Onboarding tab panels
│   │   ├── Careers.tsx   # Department filters and agency job listings
│   │   └── Chatbot.tsx   # Floating AI assistant
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── SectionHeading.tsx
│       ├── MetricCard.tsx
│       ├── DashboardCard.tsx
│       ├── TeamCard.tsx
│       ├── InvestorCard.tsx
│       ├── PartnerLogo.tsx
│       ├── GlowCard.tsx
│       └── FormInput.tsx
│
├── data/                 # Centralized content models
│   ├── careers.ts
│   ├── clients.ts
│   ├── investors.ts
│   ├── leadership.ts
│   ├── media.ts
│   ├── metrics.ts
│   ├── partners.ts
│   └── platforms.ts
│
├── lib/
│   └── utils.ts          # Tailwind CSS merge utilities
│
└── styles/
    └── animations.css    # Custom dotted grid assets, marquees, ambient pulses
```

---

## ⚙️ Local Installation & Development

### 1. Clone & Initialize

Make sure you are in the project folder and run:

```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment

Create a `.env` file (copied from `.env.example`) and verify your API keys:

```ini
NEXT_PUBLIC_CHAT_API_KEY=fyn_demo_key_12345
```

### 3. Run Development Server

Launch the hot-reloading development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your browser to inspect the control center.

### 4. Compile Production Build

To test and compile the production-ready package:

```bash
npm run build
```

The app will compile static HTML pages and server-optimized bundles inside the `.next/` directory.

---

## 🔒 Security & Performance Features

1. **Recharts SSR Hydration Bypass**: To prevent React hydration mismatches on charts during Next.js server-side rendering, `FleetImpact.tsx` implements client-side mounts with beautiful loader placeholders, ensuring 100% stability.
2. **Next.js Image Asset Optimization**: Both negative (`fyn-logo-negative.png`) and standard logos use `next/image` to automatically scale, resize, and serve modern WebP images.
3. **No-Gloss Glassmorphism**: Tailored layered dark card grids (`#161616`) combined with premium accent pink `#E8197A` borders and glows, avoiding bloated and heavy particle overlays to keep animations GPU-light.
