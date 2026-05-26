/**
 * ============================================================================
 * FYN PARTNERS DATA CONSTANTS
 * ============================================================================
 * Centralized, editable database of Fyn's ecosystem partners (OEMs, Charging, Finance).
 * 
 * HOW TO EDIT:
 * 1. ADDING A PARTNER: Add a new object inside the `partnersList` array.
 * 2. CATEGORY: Set `category` to `"oem"`, `"financing"`, or `"charging"`.
 * 3. LOGOS: Place your logo image in `public/logos/` (e.g. `public/logos/tvs.webp`) 
 *    and specify its path under the `logo` property: `logo: "/logos/tvs.webp"`.
 *    If no image is ready, leave it empty `""`, and the system will fall back 
 *    to a premium typographical card automatically.
 * 4. WEBSITES: Add the partner's external corporate website URL under `website`.
 * ============================================================================
 */

export interface PartnerItem {
  id: string;
  name: string;
  category: "oem" | "financing" | "charging";
  logo: string; // File path to partner logo (e.g., "/logos/tvs.webp")
  website?: string; // External website link
  description?: string; // Optional partner description
  logoClass?: string; // Optional optical logo scaling/filter tuning
}

export const partnersList: PartnerItem[] = [
  // OEMs
  { id: "tvs-oem", name: "TVS", category: "oem", logo: "/logos/tvs.webp", website: "https://www.tvsmotor.com", logoClass: "max-w-[76%] max-h-[76%]" },
  { id: "mahindra", name: "Mahindra", category: "oem", logo: "/logos/mahindra.webp", website: "https://www.mahindra.com", logoClass: "max-w-[72%] max-h-[72%]" },
  { id: "eicher", name: "Eicher", category: "oem", logo: "/logos/eicher.webp", website: "https://www.eicher.in", logoClass: "max-w-[68%] max-h-[68%]" },
  { id: "montra", name: "Montra", category: "oem", logo: "/logos/montra.webp", website: "https://www.montraelectric.com", logoClass: "max-w-[72%] max-h-[72%]" },
  { id: "euler", name: "Euler", category: "oem", logo: "/logos/euler.webp", website: "https://www.eulermotors.com", logoClass: "max-w-[72%] max-h-[72%]" },
  { id: "atul", name: "Atul", category: "oem", logo: "/logos/atul.webp", website: "https://atulauto.co.in", logoClass: "max-w-[58%] max-h-[58%]" },
  { id: "piaggio", name: "Piaggio", category: "oem", logo: "/logos/piaggio.webp", website: "https://www.piaggio.com", logoClass: "max-w-[48%] max-h-[66%]" },
  { id: "osm", name: "OSM", category: "oem", logo: "/logos/osm.webp", website: "https://omegaseikimobility.com", logoClass: "max-w-[58%] max-h-[58%] invert brightness-[2.8]" },
  { id: "altigreen", name: "Altigreen", category: "oem", logo: "/logos/altigreen.webp", website: "https://www.altigreen.com", logoClass: "max-w-[76%] max-h-[76%]" },

  // Financing
  { id: "chola", name: "Chola", category: "financing", logo: "/logos/chola.webp", website: "https://www.cholamandalam.com", logoClass: "max-w-[72%] max-h-[72%] invert brightness-[2.2]" },
  { id: "sundaram", name: "Sundaram Finance", category: "financing", logo: "/logos/sundaram.webp", website: "https://sundaramfinance.in", logoClass: "max-w-[76%] max-h-[76%] invert brightness-[2.6]" },
  { id: "ecofy", name: "Ecofy", category: "financing", logo: "/logos/ecofy.webp", website: "https://ecofy.co.in", logoClass: "max-w-[66%] max-h-[66%]" },
  { id: "altmobility", name: "Alt Mobility", category: "financing", logo: "/logos/altmobility.webp", website: "https://www.alt-mobility.com", logoClass: "max-w-[64%] max-h-[64%]" },

  // Charging
  { id: "exponent", name: "Exponent Energy", category: "charging", logo: "/logos/exponent.webp", website: "https://www.exponent.energy", logoClass: "max-w-[72%] max-h-[72%]" },
  { id: "honda", name: "Honda e:Swap", category: "charging", logo: "/logos/honda.webp", website: "https://honda-mpp.com/in", logoClass: "max-w-[76%] max-h-[76%] invert brightness-[2.8]" },
  { id: "sunmobility", name: "SUN Mobility", category: "charging", logo: "/logos/sunmobility.webp", website: "https://www.sunmobility.com", logoClass: "max-w-[66%] max-h-[66%]" }
];
