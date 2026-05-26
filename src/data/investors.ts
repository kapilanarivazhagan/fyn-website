/**
 * ============================================================================
 * FYN INVESTORS DATA CONSTANTS
 * ============================================================================
 * Centralized, editable database of Fyn's backing partners and institutional investors.
 *
 * HOW TO EDIT:
 * 1. ADDING AN INVESTOR:
 *    Insert a new object inside `investorsList`.
 *
 * 2. LOGOS:
 *    Add investor logo into:
 *    public/logos/
 *
 *    Example:
 *    public/logos/gail.webp
 *
 *    Then reference:
 *    logo: "/logos/gail.webp"
 *
 * 3. LOGO SCALING:
 *    Use `logoClass` for custom optical scaling.
 *
 *    Example:
 *    logoClass: "max-w-[58%] max-h-[58%]"
 *
 * 4. DETAILS:
 *    Customize `type` and `description`.
 *
 * 5. WEBSITES:
 *    Add official URLs if available.
 * ============================================================================
 */

export interface InvestorItem {
  id: string;
  name: string;
  type: string;
  logo: string;
  description: string;
  website?: string;
  logoClass?: string;
}

export const investorsList: InvestorItem[] = [
  {
    id: "tvs",
    name: "TVS Mobility Family",
    type: "Corporate Venture",
    logo: "/logos/tvs-mobility.png",
    description:
      "Opening legacy doors across India's automotive supply chain and vehicle distribution networks.",
    website: "",
  },

  {
    id: "gail",
    name: "GAIL (India) Limited",
    type: "Strategic Partner",
    logo: "/logos/gail.png",
    description:
      "A leading Maharatna public sector undertaking empowering our clean energy and green transition objectives.",
    website: "",
  },

  {
    id: "upaya",
    name: "Upaya Social Ventures",
    type: "Social Impact Venture",
    logo: "/logos/upaya.png",
    description:
      "Committed to creating dignified jobs and lifting drivers out of poverty through sustainable livelihoods.",
    website: "",
  },

  {
    id: "sattva",
    name: "Sattva",
    type: "Impact Investor",
    logo: "/logos/sattva.png",
    description:
      "Driving large-scale social impact and systemic ecosystem improvements within the EV community.",
    website: "",
  },

  {
    id: "vijay-kedia",
    name: "Vijay Kedia",
    type: "Veteran Investor",
    logo: "/logos/vijay-kedia.png",
    description:
      "Prominent market leader backing Fyn's asset-light business model and operational scaling capabilities.",
    website: "",
  },

  {
    id: "sincere",
    name: "Sincere Syndication",
    type: "Angel Syndicate",
    logo: "/logos/sincere.png",
    description:
      "Early-stage strategic backing focusing on technology-first mobility and infrastructure solutions.",
    website: "",
  },

  {
    id: "bluehill",
    name: "Bluehill Capital",
    type: "Venture Capital",  
    logo: "/logos/bluehill.webp",
    logoClass:
      "max-w-[58%] max-h-[58%] invert brightness-[3]",
    description:
      "Deep tech venture capital firm supporting tech-forward green transition startups in India.",
    website: "",
  },

  {
    id: "keiretsu",
    name: "Keiretsu Forum",
    type: "Global Angel Network",
    logo: "/logos/keiretsu.png",
    description:
      "International angel investment network validating Fyn's scalability and institutional quality.",
    website: "",
  },

  {
    id: "eagle10",
    name: "Eagle10 Ventures",
    type: "Venture Builder",
    logo: "/logos/eagle10.png",
    description:
      "Co-investing and scaling game-changing platform models with operational advisory.",
    website: "",
  },

  {
    id: "ipv",
    name: "Inflection Point Ventures",
    type: "Early-Stage VC",
    logo: "/logos/ipv.png",
    description:
      "Empowering scalable startups through a vast network of corporate leaders and capital.",
    website: "",
  },
];