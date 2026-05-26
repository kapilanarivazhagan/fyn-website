/**
 * Verified public media resources for the Media & Presence section.
 *
 * Every card points to a real public URL. If a future category has too little
 * content, merge it into one of the three editorial groups instead of creating
 * a sparse standalone section.
 */

export type MediaGroup = "headlines" | "conversations" | "presence";

export type MediaType =
  | "funding"
  | "feature"
  | "interview"
  | "podcast"
  | "linkedin";

export interface MediaItem {
  id: string;
  title: string;
  source: string;
  platform: string;
  type: MediaType;
  group: MediaGroup;
  description: string;
  sortDate: string;
  displayDate: string;
  url: string;
  thumbnail: string;
  thumbnailAlt: string;
  readingTime?: string;
  featured?: boolean;
  slider?: boolean;
  topics: string[];
}

export const mediaResources: MediaItem[] = [
  {
    id: "economic-times-2025-funding",
    title: "EVaaS startup Fyn Mobility raises $2.5 million, eyes global markets",
    source: "The Economic Times",
    platform: "Funding News",
    type: "funding",
    group: "headlines",
    description:
      "Coverage of Fyn Mobility's $2.5 million round and plans to scale domestic operations, technology, and international market entry.",
    sortDate: "2025-05-19",
    displayDate: "May 2025",
    url: "https://economictimes.indiatimes.com/tech/funding/evaas-startup-fyn-mobility-raises-2-5-million-eyes-global-markets/articleshow/121219146.cms/",
    thumbnail: "/media/economic-times-2025-funding.webp",
    thumbnailAlt: "The Economic Times funding article thumbnail",
    featured: true,
    slider: true,
    topics: ["Funding", "Expansion", "EV-as-a-Service"],
  },
  {
    id: "renewable-india-2023-origin",
    title:
      "The Birth of Fyn Mobility: An Inside Look at India's First Vertically Integrated EV Start-up",
    source: "Renewable India",
    platform: "Editorial",
    type: "feature",
    group: "headlines",
    description:
      "Editorial coverage of Fyn's IIT-Madras origin, pivot into EV ecosystem infrastructure, and full-stack approach to last-mile mobility.",
    sortDate: "2023-05-03",
    displayDate: "May 2023",
    url: "https://www.renewable-india.com/editorial/the-birth-of-fyn-mobility-an-inside-look-at-indias-first-vertically-integrated-ev-start-up/",
    thumbnail: "/media/renewable-india-2023-origin.webp",
    thumbnailAlt: "Renewable India Fyn Mobility article thumbnail",
    slider: true,
    topics: ["Startup Story", "EV Ecosystem", "IIT Madras"],
  },
  {
    id: "emobility-plus-2023-cbo",
    title:
      "Fyn Mobility appoints Niroop Janardhannan as Chief Business Officer to drive expansion plans",
    source: "EMobility+",
    platform: "Company News",
    type: "feature",
    group: "headlines",
    description:
      "Leadership announcement covering Niroop Janardhannan's appointment and Fyn's expansion plans across cities and enterprise fleet operations.",
    sortDate: "2023-03-29",
    displayDate: "Mar 2023",
    url: "https://emobilityplus.com/2023/03/29/fyn-mobility-appoints-niroop-janardhannan-as-chief-business-officer-to-drive-expansion-plans/",
    thumbnail: "/media/emobility-plus-2023-cbo.webp",
    thumbnailAlt: "EMobility+ leadership appointment article image",
    slider: true,
    topics: ["Leadership", "Expansion", "Operations"],
  },
  {
    id: "mobility-outlook-2022-products",
    title: "FYN Set To Launch Electric 2/3-Wheelers",
    source: "Mobility Outlook",
    platform: "Product Feature",
    type: "feature",
    group: "headlines",
    description:
      "Early product coverage of Fyn's electric two- and three-wheeler plans, charging partnerships, and B2B fleet growth targets.",
    sortDate: "2022-10-28",
    displayDate: "Oct 2022",
    url: "https://www.mobilityoutlook.com/features/fyn-set-to-launch-electric-23wheelers/",
    thumbnail: "/media/mobility-outlook-2022-products.webp",
    thumbnailAlt: "Mobility Outlook Fyn product article image",
    readingTime: "2 min",
    topics: ["Product", "Manufacturing", "Charging"],
  },
  {
    id: "energizing-india-2023-podcast",
    title: "Rediscovering Sustainable Last Mile Logistics",
    source: "Energizing India Podcast",
    platform: "Podcast",
    type: "podcast",
    group: "conversations",
    description:
      "A 27-minute conversation with co-founder Visakh Sasikumar on micro-electric mobility, data-led last-mile delivery, and zero-emission logistics.",
    sortDate: "2023-06-16",
    displayDate: "Jun 2023",
    url: "https://energizingindia.tv/ep-37-rediscovering-sustainable-last-mile-logistics-fyn/",
    thumbnail: "/media/energizing-india-2023-podcast.webp",
    thumbnailAlt: "Energizing India podcast episode artwork",
    readingTime: "27:53",
    slider: true,
    topics: ["Founder Talk", "Last-mile Logistics", "Digitization"],
  },
  {
    id: "etauto-2023-fast-charging",
    title:
      "Fyn Mobility to expand to new areas to be leading last mile EV logistics service provider",
    source: "ETAuto",
    platform: "Founder Interview",
    type: "interview",
    group: "conversations",
    description:
      "Visakh Sasikumar discusses fleet scale, B2B demand, supply-chain resilience, charging infrastructure, and Fyn's long-term EV logistics roadmap.",
    sortDate: "2023-06-07",
    displayDate: "Jun 2023",
    url: "https://auto.economictimes.indiatimes.com/news/two-wheelers/fyn-mobility-to-expand-to-new-areas-to-be-leading-last-mile-ev-logistics-service-provider-says-visakh-sasikumar-founder/100818625",
    thumbnail: "/media/etauto-2023-fast-charging.webp",
    thumbnailAlt: "ETAuto founder interview article image",
    readingTime: "4 min",
    slider: true,
    topics: ["Founder Interview", "Fast Charging", "B2B Fleets"],
  },
  {
    id: "renewable-watch-2023-founder",
    title: "Visakh Sasikumar: Founder, Fyn Mobility",
    source: "Renewable Watch",
    platform: "Founder Profile",
    type: "interview",
    group: "conversations",
    description:
      "A founder profile on Visakh Sasikumar's EV experience, IIT-Madras roots, fundraising role, and view of India's sustainable logistics opportunity.",
    sortDate: "2023-05-25",
    displayDate: "May 2023",
    url: "https://renewablewatch.in/2023/05/25/visakh-sasikumar-founder-fyn-mobility/",
    thumbnail: "/media/business-news-week-2022-interview.webp",
    thumbnailAlt: "Renewable Watch founder profile image",
    topics: ["Founder Profile", "EV Industry", "Leadership"],
  },
  {
    id: "evmechanica-2023-evaas",
    title: "Meet the Man Behind India's First Vertically Integrated EV-As-A-Service Platform",
    source: "EVMechanica",
    platform: "Founder Interview",
    type: "interview",
    group: "conversations",
    description:
      "Interview with Visakh Sasikumar on Fyn's vertically integrated EV-as-a-service platform, fleet mix, sector focus, and technology-led deployment model.",
    sortDate: "2023-01-04",
    displayDate: "Jan 2023",
    url: "https://www.evmechanica.com/fyn-mobility-ev-as-a-service-platform/",
    thumbnail: "/media/evmechanica-2023-evaas.webp",
    thumbnailAlt: "EVMechanica founder interview image",
    readingTime: "6 min",
    topics: ["EVaaS", "Founder Interview", "Fleet Operations"],
  },
  {
    id: "business-news-week-2022-interview",
    title: "Exclusive Interview: Visakh Sasikumar, CEO & Co-founder, Fyn Mobility",
    source: "Business News Week",
    platform: "Founder Interview",
    type: "interview",
    group: "conversations",
    description:
      "A broad founder interview on Fyn's EV manufacturing roots, logistics pivot, funding, fleet targets, and data-backed deployment platform.",
    sortDate: "2022-09-01",
    displayDate: "2022",
    url: "https://businessnewsweek.in/interview/exclusive-interview-visakh-sasikumar-ceo-co-founder-fyn-mobility/",
    thumbnail: "/media/business-news-week-2022-interview.webp",
    thumbnailAlt: "Business News Week founder interview portrait",
    topics: ["Founder Interview", "Business Model", "Fleet Technology"],
  },
  {
    id: "linkedin-growthsense-2025-funding",
    title: "Fyn Mobility raises $2.5M to drive EV fleet expansion",
    source: "Growth Sense News",
    platform: "LinkedIn",
    type: "linkedin",
    group: "presence",
    description:
      "Startup funding coverage shared on LinkedIn, highlighting Fyn's fleet expansion, technology scale-up, and Southeast Asia ambitions.",
    sortDate: "2025-06-16",
    displayDate: "2025",
    url: "https://www.linkedin.com/posts/growthsensenews_fyn-mobility-secures-25m-to-expand-ev-fleet-activity-7330135245079359488-osxk",
    thumbnail: "/media/linkedin-growthsense-2025-funding.webp",
    thumbnailAlt: "LinkedIn funding post preview image",
    slider: true,
    topics: ["Funding", "EVaaS", "Startup Growth"],
  },
  {
    id: "linkedin-fyn-infynity-driver-day",
    title: "INFYNITY soft launch and Peace Auto Union Driver's Day",
    source: "Fyn",
    platform: "LinkedIn",
    type: "linkedin",
    group: "presence",
    description:
      "Fyn's post on engaging more than 2,000 auto drivers and introducing INFYNITY as a platform for blue-collar empowerment.",
    sortDate: "2025-11-09",
    displayDate: "Live",
    url: "https://www.linkedin.com/posts/fynmobility_infynity-fynmobility-bluecollarempowerment-activity-7396851434731945984-N1aJ",
    thumbnail: "/media/emobility-plus-2023-cbo.webp",
    thumbnailAlt: "LinkedIn INFYNITY driver community video thumbnail",
    slider: true,
    topics: ["INFYNITY", "Driver Community", "Social Impact"],
  },
  {
    id: "linkedin-fyn-inc42-ev-startups",
    title: "Fyn featured in Inc42's EV startup spotlight",
    source: "Fyn",
    platform: "LinkedIn",
    type: "linkedin",
    group: "presence",
    description:
      "Fyn's public acknowledgement of being included in Inc42's EV startup ecosystem coverage.",
    sortDate: "2024-05-27",
    displayDate: "2024",
    url: "https://www.linkedin.com/posts/fynmobility_fynmobility-sustainability-electricvehicles-activity-7198282274386173953-dxpd",
    thumbnail: "/media/linkedin-fyn-inc42-ev-startups.webp",
    thumbnailAlt: "LinkedIn Inc42 EV startup recognition post image",
    topics: ["EV Startups", "Recognition", "Sustainability"],
  },
  {
    id: "linkedin-fyn-dubai-north-star",
    title: "Fyn Mobility at Dubai Expand North Star",
    source: "Fyn",
    platform: "LinkedIn",
    type: "linkedin",
    group: "presence",
    description:
      "A public ecosystem presence post from Fyn's participation in Dubai Expand North Star.",
    sortDate: "2023-10-13",
    displayDate: "2023",
    url: "https://www.linkedin.com/posts/fynmobility_dubai-xpandnorthstar-fynmobility-activity-7118853093546475520-l0BJ",
    thumbnail: "/media/linkedin-fyn-dubai-north-star.webp",
    thumbnailAlt: "LinkedIn Dubai Expand North Star post image",
    topics: ["Events", "Startup Ecosystem", "Global Presence"],
  },
  {
    id: "linkedin-fyn-leadership-team",
    title: "Leading with Vision: Celebrating Fyn's leadership team",
    source: "Fyn",
    platform: "LinkedIn",
    type: "linkedin",
    group: "presence",
    description:
      "A leadership-focused post highlighting Fyn's CEO, CSO, and CBO and the culture behind the company's growth.",
    sortDate: "2024-02-25",
    displayDate: "2024",
    url: "https://www.linkedin.com/posts/fynmobility_leadership-visionaryleaders-employeegrowth-activity-7167849440332951553-yJKW",
    thumbnail: "/media/linkedin-fyn-leadership-team.webp",
    thumbnailAlt: "LinkedIn Fyn leadership team post image",
    topics: ["Leadership", "Culture", "Team"],
  },
  {
    id: "linkedin-manu-iyer-year-milestones",
    title: "Fyn achieves milestones in revenue, utilisation, and partnerships",
    source: "Manu Iyer",
    platform: "LinkedIn",
    type: "linkedin",
    group: "presence",
    description:
      "A leadership post highlighting Fyn's year of operating gains, utilisation improvements, and partnership momentum.",
    sortDate: "2026-04-01",
    displayDate: "2026",
    url: "https://www.linkedin.com/posts/manuiyer_what-a-year-for-fyn-alongside-the-gains-activity-7414586448051503104-DRKr",
    thumbnail: "/media/linkedin-manu-iyer-year-milestones.webp",
    thumbnailAlt: "LinkedIn Fyn year milestone post image",
    topics: ["Milestones", "Partnerships", "Operations"],
  },
];

export const sortedMediaResources = [...mediaResources].sort(
  (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
);

export const mediaSections: Array<{
  id: MediaGroup;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    id: "headlines",
    eyebrow: "Featured Media / Headlines",
    title: "Signals from the EV and startup press",
    description:
      "Funding coverage, company milestones, ecosystem features, and product stories that establish Fyn's market presence.",
  },
  {
    id: "conversations",
    eyebrow: "Podcasts / Interviews / Videos",
    title: "Founder-led conversations and interviews",
    description:
      "Long-form perspectives on EV-as-a-service, last-mile logistics, fleet operations, and Fyn's full-stack platform thinking.",
  },
  {
    id: "presence",
    eyebrow: "LinkedIn / Thought Leadership / Social Presence",
    title: "Live ecosystem presence",
    description:
      "Exact public posts that capture Fyn's community work, recognition, leadership voice, events, and growth momentum.",
  },
];

export const sliderMediaResources = sortedMediaResources.filter(
  (item) => item.slider
);
