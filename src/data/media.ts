/**
 * ============================================================================
 * FYN MEDIA & PRESS DATA CONSTANTS
 * ============================================================================
 * Centralized, editable database of Fyn's media coverages, news articles, and press releases.
 * 
 * HOW TO EDIT:
 * 1. ADDING AN ARTICLE: Insert a new object inside `mediaList`.
 * 2. OUTLET LOGOS: Place media logo in `public/logos/` (e.g. `public/logos/inc42.png`)
 *    and specify its path: `logo: "/logos/inc42.png"`.
 *    Leave empty `""` to fall back to typographic representation.
 * 3. EXTERNAL LINKS: Insert actual news URLs under the `url` property.
 * ============================================================================
 */

export interface MediaItem {
  id: string;
  source: string; // Name of media source (e.g., "The Economic Times")
  headline: string; // Article title
  excerpt: string; // Quick summary of the article
  url: string; // Link to the actual article
  date: string; // Date of publication (e.g., "Dec 2025")
  logo: string; // File path to media outlet logo (e.g., "/logos/economic-times.png")
}

export const mediaList: MediaItem[] = [
  {
    id: "et-funding",
    source: "The Economic Times",
    headline: "EV Fleet platform Fyn Mobility raises capital to scale operations",
    excerpt: "Fyn Mobility plans to expand its fleet to over 5,000 EVs and double down on its proprietary technology suite, OptiFyn, for real-time battery analytics.",
    url: "#",
    date: "Dec 2025",
    logo: "/logos/economic-times.png"
  },
  {
    id: "inc42-ecosystem",
    source: "Inc42",
    headline: "Fyn's evolution from a logistics company to India's largest EV supply ecosystem",
    excerpt: "By creating an asset-light model that bridges drivers, charging OEM partners, and flexible finance options, Fyn is building India's most resilient green corridor.",
    url: "#",
    date: "Jan 2026",
    logo: "/logos/inc42.png"
  },
  {
    id: "yourstory-driver-empowerment",
    source: "YourStory",
    headline: "How INFYNITY by Fyn is building a secure ecosystem for last-mile EV drivers",
    excerpt: "More than just a job, Fyn is introducing healthcare, financial inclusion, and formal training structures to elevate thousands of gig-economy drivers.",
    url: "#",
    date: "Mar 2026",
    logo: "/logos/yourstory.png"
  },
  {
    id: "mint-refynd",
    source: "LiveMint",
    headline: "Fyn Mobility launches Refynd: The EV marketplace for fleet leasing",
    excerpt: "Flexible options allow regional logistics providers and single drivers to lease, rent, or buy EVs with pre-approved eco-centric finance channels.",
    url: "#",
    date: "Feb 2026",
    logo: "/logos/mint.png"
  },
  {
    id: "techcircle-iot",
    source: "TechCircle",
    headline: "Full-stack IoT and predictive operations: Inside Fyn's technology suite",
    excerpt: "With real-time route optimizing algorithms and battery state of health checks, Fyn lowers operational overheads by 22% for enterprise accounts.",
    url: "#",
    date: "Apr 2026",
    logo: "/logos/techcircle.png"
  }
];

export const mediaMarqueeSources = [
  "The Economic Times", "Inc42", "YourStory", "LiveMint", "TechCircle", "Business Standard", "Entrackr", "Financial Express"
];
