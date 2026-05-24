/**
 * ============================================================================
 * FYN ENTERPRISE CLIENTS DATA CONSTANTS
 * ============================================================================
 * Centralized, editable database of Fyn's enterprise & last-mile clients.
 * 
 * HOW TO EDIT:
 * 1. ADDING A CLIENT: Insert a new object inside `clientsList`.
 * 2. LOGOS: Add the client logo PNG/SVG into `public/logos/` (e.g. `public/logos/porter.png`)
 *    and specify its path: `logo: "/logos/porter.png"`.
 *    Leave empty `""` to automatically fall back to typographic representation.
 * 3. WEBSITES: Add external website link under `website` if available.
 * ============================================================================
 */

export interface ClientItem {
  id: string;
  name: string;
  logo: string; // File path to client logo (e.g., "/logos/porter.png")
  website?: string; // External website link
  description?: string; // Optional description
}

export const clientsList: ClientItem[] = [
  { id: "porter", name: "Porter", logo: "/logos/porter.png", website: "" },
  { id: "dhl", name: "DHL", logo: "/logos/dhl.png", website: "" },
  { id: "delhivery", name: "Delhivery", logo: "/logos/delhivery.png", website: "" },
  { id: "cocacola", name: "Coca-Cola", logo: "/logos/cocacola.png", website: "" },
  { id: "amazon", name: "Amazon", logo: "/logos/amazon.png", website: "" },
  { id: "bigbasket", name: "BigBasket", logo: "/logos/bigbasket.png", website: "" },
  { id: "flipkart", name: "Flipkart", logo: "/logos/flipkart.png", website: "" },
  { id: "rapido", name: "Rapido", logo: "/logos/rapido.png", website: "" },
  { id: "uber", name: "Uber", logo: "/logos/uber.png", website: "" },
  { id: "nammayatri", name: "NammaYatri", logo: "/logos/nammayatri.png", website: "" }
];
