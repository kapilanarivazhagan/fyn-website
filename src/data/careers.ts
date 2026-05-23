export interface ValueItem {
  title: string;
  description: string;
  iconName: string;
}

export interface JobItem {
  id: string;
  title: string;
  department: "Technology" | "Operations" | "Product" | "Fleet" | "HR" | "Sales";
  location: string;
  type: string;
  experience: string;
}

export const startupValues: ValueItem[] = [
  {
    title: "High Agency & Bold Goals",
    description: "We don't wait for permission. We take initiative, make decisions, and drive results aggressively.",
    iconName: "Flame"
  },
  {
    title: "Operational Rigor",
    description: "Mobility is built on details. We verify routing, keep fleets clean, and deliver on SLAs, always.",
    iconName: "Activity"
  },
  {
    title: "Driver-First Heart",
    description: "Every decision we make honors the drivers who power India's corridors. Their safety and dignity are absolute.",
    iconName: "Heart"
  },
  {
    title: "Ecosystem Integration",
    description: "We solve complex system-wide problems, connecting charging, tech, and assets rather than isolated features.",
    iconName: "GitMerge"
  }
];

export const openJobsList: JobItem[] = [
  {
    id: "tech-lead-iot",
    title: "Lead IoT Telemetry Engineer",
    department: "Technology",
    location: "Bengaluru",
    type: "Full-time",
    experience: "5+ Years"
  },
  {
    id: "pm-refynd",
    title: "Product Manager — Refynd Marketplace",
    department: "Product",
    location: "Bengaluru",
    type: "Full-time",
    experience: "3+ Years"
  },
  {
    id: "ops-manager-chennai",
    title: "Operations Hub Manager",
    department: "Operations",
    location: "Chennai",
    type: "Full-time",
    experience: "2+ Years"
  },
  {
    id: "fleet-analyst",
    title: "Fleet Operations & Data Analyst",
    department: "Fleet",
    location: "Hyderabad",
    type: "Full-time",
    experience: "1+ Years"
  },
  {
    id: "hr-business-partner",
    title: "HR Specialist (Culture & Recruitment)",
    department: "HR",
    location: "Bengaluru",
    type: "Full-time",
    experience: "3+ Years"
  },
  {
    id: "react-native-dev",
    title: "React Native Mobile Developer (INFYNITY)",
    department: "Technology",
    location: "Bengaluru",
    type: "Full-time",
    experience: "3+ Years"
  }
];
