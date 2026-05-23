export interface InvestorItem {
  id: string;
  name: string;
  type: string;
  logoName: string;
  description: string;
}

export const investorsList: InvestorItem[] = [
  {
    id: "tvs",
    name: "TVS Mobility Family",
    type: "Corporate Venture",
    logoName: "tvs-mobility.png",
    description: "Opening legacy doors across India's automotive supply chain and vehicle distribution networks."
  },
  {
    id: "gail",
    name: "GAIL (India) Limited",
    type: "Strategic Partner",
    logoName: "gail.png",
    description: "A leading Maharatna public sector undertaking empowering our clean energy and green transition objectives."
  },
  {
    id: "upaya",
    name: "Upaya Social Ventures",
    type: "Social Impact Venture",
    logoName: "upaya.png",
    description: "Committed to creating dignified jobs and lifting drivers out of poverty through sustainable livelihoods."
  },
  {
    id: "sattva",
    name: "Sattva",
    type: "Impact Investor",
    logoName: "sattva.png",
    description: "Driving large-scale social impact and systemic ecosystem improvements within the EV community."
  },
  {
    id: "vijay-kedia",
    name: "Vijay Kedia",
    type: "Veteran Investor",
    logoName: "vijay-kedia.png",
    description: "Prominent market leader backing Fyn's asset-light business model and operational scaling capabilities."
  },
  {
    id: "sincere",
    name: "Sincere Syndication",
    type: "Angel Syndicate",
    logoName: "sincere.png",
    description: "Early-stage strategic backing focusing on technology-first mobility and infrastructure solutions."
  },
  {
    id: "bluehill",
    name: "Bluehill Capital",
    type: "Venture Capital",
    logoName: "bluehill.png",
    description: "Deep tech venture capital firm supporting tech-forward green transition startups in India."
  },
  {
    id: "keiretsu",
    name: "Keiretsu Forum",
    type: "Global Angel Network",
    logoName: "keiretsu.png",
    description: "International angel investment network validating Fyn's scalability and institutional quality."
  },
  {
    id: "eagle10",
    name: "Eagle10 Ventures",
    type: "Venture Builder",
    logoName: "eagle10.png",
    description: "Co-investing and scaling game-changing platform models with operational advisory."
  },
  {
    id: "ipv",
    name: "Inflection Point Ventures",
    type: "Early-Stage VC",
    logoName: "ipv.png",
    description: "Empowering scalable startups through a vast network of corporate leaders and capital."
  }
];
