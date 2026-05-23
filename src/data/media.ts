export interface MediaItem {
  id: string;
  source: string;
  headline: string;
  excerpt: string;
  url: string;
  date: string;
  logoName: string;
}

export const mediaList: MediaItem[] = [
  {
    id: "et-funding",
    source: "The Economic Times",
    headline: "EV Fleet platform Fyn Mobility raises capital to scale operations",
    excerpt: "Fyn Mobility plans to expand its fleet to over 5,000 EVs and double down on its proprietary technology suite, OptiFyn, for real-time battery analytics.",
    url: "#",
    date: "Dec 2025",
    logoName: "economic-times.png"
  },
  {
    id: "inc42-ecosystem",
    source: "Inc42",
    headline: "Fyn's evolution from a logistics company to India's largest EV supply ecosystem",
    excerpt: "By creating an asset-light model that bridges drivers, charging OEM partners, and flexible finance options, Fyn is building India's most resilient green corridor.",
    url: "#",
    date: "Jan 2026",
    logoName: "inc42.png"
  },
  {
    id: "yourstory-driver-empowerment",
    source: "YourStory",
    headline: "How INFYNITY by Fyn is building a secure ecosystem for last-mile EV drivers",
    excerpt: "More than just a job, Fyn is introducing healthcare, financial inclusion, and formal training structures to elevate thousands of gig-economy drivers.",
    url: "#",
    date: "Mar 2026",
    logoName: "yourstory.png"
  },
  {
    id: "mint-refynd",
    source: "LiveMint",
    headline: "Fyn Mobility launches Refynd: The EV marketplace for fleet leasing",
    excerpt: "Flexible options allow regional logistics providers and single drivers to lease, rent, or buy EVs with pre-approved eco-centric finance channels.",
    url: "#",
    date: "Feb 2026",
    logoName: "mint.png"
  },
  {
    id: "techcircle-iot",
    source: "TechCircle",
    headline: "Full-stack IoT and predictive operations: Inside Fyn's technology suite",
    excerpt: "With real-time route optimizing algorithms and battery state of health checks, Fyn lowers operational overheads by 22% for enterprise accounts.",
    url: "#",
    date: "Apr 2026",
    logoName: "techcircle.png"
  }
];

export const mediaMarqueeSources = [
  "The Economic Times", "Inc42", "YourStory", "LiveMint", "TechCircle", "Business Standard", "Entrackr", "Financial Express"
];
