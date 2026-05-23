export interface PartnerItem {
  id: string;
  name: string;
  category: "oem" | "financing" | "charging";
  logoName: string;
}

export const partnersList: PartnerItem[] = [
  // OEMs
  { id: "tvs-oem", name: "TVS", category: "oem", logoName: "tvs.png" },
  { id: "mahindra", name: "Mahindra", category: "oem", logoName: "mahindra.png" },
  { id: "eicher", name: "Eicher", category: "oem", logoName: "eicher.png" },
  { id: "montra", name: "Montra", category: "oem", logoName: "montra.png" },
  { id: "euler", name: "Euler", category: "oem", logoName: "euler.png" },
  { id: "atul", name: "Atul", category: "oem", logoName: "atul.png" },
  { id: "piaggio", name: "Piaggio", category: "oem", logoName: "piaggio.png" },
  { id: "osm", name: "OSM", category: "oem", logoName: "osm.png" },
  { id: "altigreen", name: "Altigreen", category: "oem", logoName: "altigreen.png" },

  // Financing
  { id: "chola", name: "Chola", category: "financing", logoName: "chola.png" },
  { id: "sundaram", name: "Sundaram Finance", category: "financing", logoName: "sundaram.png" },
  { id: "ecofy", name: "Ecofy", category: "financing", logoName: "ecofy.png" },
  { id: "altmobility", name: "Altmobility", category: "financing", logoName: "altmobility.png" },

  // Charging
  { id: "exponent", name: "Exponent Energy", category: "charging", logoName: "exponent.png" },
  { id: "honda", name: "Honda e-swap", category: "charging", logoName: "honda.png" },
  { id: "sunmobility", name: "Sunmobility", category: "charging", logoName: "sunmobility.png" }
];
