export interface PlatformItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  imageName: string;
}

export const platformsList: PlatformItem[] = [
  {
    id: "optifyn",
    name: "OptiFyn",
    tagline: "Operational Intelligence Suite",
    description: "The software operating system of our fleet. Provides real-time EV telemetry, route optimization engine, driver allocation, and battery state-of-health tracking.",
    features: [
      "IoT Telemetry with sub-second ping rates",
      "Dynamic Routing reducing delivery times by 18%",
      "Battery Analytics predicting charging needs",
      "Enterprise SLA dashboard with automated reporting"
    ],
    ctaText: "Request Demo",
    ctaLink: "https://ops.fynmobility.com/a0ce743445e30281/admin/",
    imageName: "optifyn.jpg"
  },
  {
    id: "refynd",
    name: "Refynd",
    tagline: "EV Lease, Rent, Buy Marketplace",
    description: "A flexible and fully digitized marketplace for vehicle procurement. Enabling drivers, fleet operators, and enterprise clients to procure electric vehicles effortlessly.",
    features: [
      "Lease-to-own plans with competitive rates",
      "Direct OEM supply integrations (TVS, Mahindra, Euler)",
      "Pre-vetted eco-financing channels (Chola, Ecofy)",
      "Instant battery and vehicle degradation scoring"
    ],
    ctaText: "Visit Refynd Marketplace",
    ctaLink: "https://refyndev.com/",
    imageName: "refynd.jpg"
  },
  {
    id: "infynity",
    name: "INFYNITY",
    tagline: "The Driver-First Community Platform",
    description: "Our driver empowerment and welfare app. Connecting thousands of driver partners with essential services, financial inclusion programs, training, and a supportive community.",
    features: [
      "Comprehensive Health Insurance & Accident cover",
      "Instant micro-financing and daily payouts",
      "Structured professional EV driving certifications",
      "Locational support and rapid SOS assistance"
    ],
    ctaText: "Download INFYNITY App",
    ctaLink: "https://play.google.com/store/apps/details?id=com.fynmobility.infynity&hl=en-US",
    imageName: "infynity.jpg"
  }
];
