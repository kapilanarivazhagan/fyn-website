export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
  description: string;
  iconName: string;
}

export const impactMetrics: MetricItem[] = [
  {
    id: "evs",
    value: "1,500+",
    label: "Electric Vehicles",
    sublabel: "Active smart fleet",
    description: "Connected 2-wheelers and 3-wheelers running on full-stack operational intelligence.",
    iconName: "Zap"
  },
  {
    id: "drivers",
    value: "5,000+",
    label: "Trained Drivers",
    sublabel: "Empowered community",
    description: "Full professional driver network enabled by INFYNITY benefits and insurance.",
    iconName: "Users"
  },
  {
    id: "deliveries",
    value: "10M+",
    label: "Last-Mile Deliveries",
    sublabel: "Fulfilled successfully",
    description: "Trusted delivery operations for India's leading eCommerce and quick-commerce brands.",
    iconName: "ShoppingBag"
  },
  {
    id: "kms",
    value: "20M+",
    label: "Green Kilometers",
    sublabel: "Clean miles driven",
    description: "Distance travelled emitting zero exhaust gases, saving tons of CO2.",
    iconName: "Route"
  },
  {
    id: "trees",
    value: "51K",
    label: "Trees Equivalent",
    sublabel: "CO2 absorption equivalent",
    description: "Carbon footprint reduction equal to planting fifty-one thousand mature trees.",
    iconName: "Leaf"
  },
  {
    id: "growth",
    value: "2X",
    label: "YoY Growth",
    sublabel: "Annual expansion",
    description: "Consistent doubling of revenue, fleet capacity, and client accounts yearly.",
    iconName: "TrendingUp"
  },
  {
    id: "cities",
    value: "3",
    label: "Major Cities",
    sublabel: "Active hubs",
    description: "Hyper-localized operations across Bengaluru, Chennai, and Hyderabad.",
    iconName: "MapPin"
  }
];

export const monthlyPerformanceData = [
  { month: "Jan", greenKms: 1200000, co2Saved: 3000 },
  { month: "Feb", greenKms: 1350000, co2Saved: 3375 },
  { month: "Mar", greenKms: 1500000, co2Saved: 3750 },
  { month: "Apr", greenKms: 1800000, co2Saved: 4500 },
  { month: "May", greenKms: 2100000, co2Saved: 5250 },
  { month: "Jun", greenKms: 2400000, co2Saved: 6000 },
];
