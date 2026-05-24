/**
 * ============================================================================
 * FYN PARTNERS DATA CONSTANTS
 * ============================================================================
 * Centralized, editable database of Fyn's ecosystem partners (OEMs, Charging, Finance).
 * 
 * HOW TO EDIT:
 * 1. ADDING A PARTNER: Add a new object inside the `partnersList` array.
 * 2. CATEGORY: Set `category` to `"oem"`, `"financing"`, or `"charging"`.
 * 3. LOGOS: Place your logo image in `public/logos/` (e.g. `public/logos/tvs.png`) 
 *    and specify its path under the `logo` property: `logo: "/logos/tvs.png"`.
 *    If no image is ready, leave it empty `""`, and the system will fall back 
 *    to a premium typographical card automatically.
 * 4. WEBSITES: Add the partner's external corporate website URL under `website`.
 * ============================================================================
 */

export interface PartnerItem {
  id: string;
  name: string;
  category: "oem" | "financing" | "charging";
  logo: string; // File path to partner logo (e.g., "/logos/tvs.png")
  website?: string; // External website link
  description?: string; // Optional partner description
}

export const partnersList: PartnerItem[] = [
  // OEMs
  { id: "tvs-oem", name: "TVS", category: "oem", logo: "/logos/tvs.png", website: "" },
  { id: "mahindra", name: "Mahindra", category: "oem", logo: "/logos/mahindra.png", website: "" },
  { id: "eicher", name: "Eicher", category: "oem", logo: "/logos/eicher.png", website: "" },
  { id: "montra", name: "Montra", category: "oem", logo: "/logos/montra.png", website: "" },
  { id: "euler", name: "Euler", category: "oem", logo: "/logos/euler.png", website: "" },
  { id: "atul", name: "Atul", category: "oem", logo: "/logos/atul.png", website: "" },
  { id: "piaggio", name: "Piaggio", category: "oem", logo: "/logos/piaggio.png", website: "" },
  { id: "osm", name: "OSM", category: "oem", logo: "/logos/osm.png", website: "" },
  { id: "altigreen", name: "Altigreen", category: "oem", logo: "/logos/altigreen.png", website: "" },

  // Financing
  { id: "chola", name: "Chola", category: "financing", logo: "/logos/chola.png", website: "" },
  { id: "sundaram", name: "Sundaram Finance", category: "financing", logo: "/logos/sundaram.png", website: "" },
  { id: "ecofy", name: "Ecofy", category: "financing", logo: "/logos/ecofy.png", website: "" },
  { id: "altmobility", name: "Altmobility", category: "financing", logo: "/logos/altmobility.png", website: "" },

  // Charging
  { id: "exponent", name: "Exponent Energy", category: "charging", logo: "/logos/exponent.png", website: "" },
  { id: "honda", name: "Honda e-swap", category: "charging", logo: "/logos/honda.png", website: "" },
  { id: "sunmobility", name: "Sunmobility", category: "charging", logo: "/logos/sunmobility.png", website: "" }
];
