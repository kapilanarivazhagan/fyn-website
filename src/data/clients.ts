/**
 * ============================================================================
 * FYN ENTERPRISE CLIENTS DATA CONSTANTS
 * ============================================================================
 * Centralized, editable database of Fyn's enterprise & last-mile clients.
 * 
 * HOW TO EDIT:
 * 1. ADDING A CLIENT:
 *    Insert a new object inside `clientsList`.
 * 
 * 2. LOGOS:
 *    Add logo files inside:
 *    public/logos/
 * 
 *    Example:
 *    public/logos/porter.webp
 * 
 *    Then reference:
 *    logo: "/logos/porter.webp"
 * 
 * 3. WEBSITES:
 *    Add official website URLs if available.
 * ============================================================================
 */

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
}

export const clientsList: ClientItem[] = [
  {
    id: "porter",
    name: "Porter",
    logo: "/logos/porter.webp",
    website: "https://porter.in",
  },

  {
    id: "dhl",
    name: "DHL",
    logo: "/logos/dhl.webp",
    website: "https://www.dhl.com",
  },

  {
    id: "delhivery",
    name: "Delhivery",
    logo: "/logos/delhivery.webp",
    website: "https://www.delhivery.com",
  },

  {
    id: "cocacola",
    name: "Coca-Cola",
    logo: "/logos/coke.webp",
    website: "https://www.coca-cola.com",
  },

  {
    id: "amazon",
    name: "Amazon",
    logo: "/logos/amazon.webp",
    website: "https://www.amazon.in",
  },

  {
    id: "bigbasket",
    name: "BigBasket",
    logo: "/logos/bigbasket.webp",
    website: "https://www.bigbasket.com",
  },

  {
    id: "flipkart",
    name: "Flipkart",
    logo: "/logos/flipkart.webp",
    website: "https://www.flipkart.com",
  },

  {
    id: "rapido",
    name: "Rapido",
    logo: "/logos/rapido.webp",
    website: "https://www.rapido.bike",
  },

  {
    id: "uber",
    name: "Uber",
    logo: "/logos/uber.webp",
    website: "https://www.uber.com",
  },

  {
    id: "nammayatri",
    name: "Namma Yatri",
    logo: "/logos/nammayatri.webp",
    website: "https://www.nammayatri.in",
  },
];