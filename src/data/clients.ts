export interface ClientItem {
  id: string;
  name: string;
  logoName: string;
}

export const clientsList: ClientItem[] = [
  { id: "porter", name: "Porter", logoName: "porter.png" },
  { id: "dhl", name: "DHL", logoName: "dhl.png" },
  { id: "delhivery", name: "Delhivery", logoName: "delhivery.png" },
  { id: "cocacola", name: "Coca-Cola", logoName: "cocacola.png" },
  { id: "amazon", name: "Amazon", logoName: "amazon.png" },
  { id: "bigbasket", name: "BigBasket", logoName: "bigbasket.png" },
  { id: "flipkart", name: "Flipkart", logoName: "flipkart.png" },
  { id: "rapido", name: "Rapido", logoName: "rapido.png" },
  { id: "uber", name: "Uber", logoName: "uber.png" },
  { id: "nammayatri", name: "NammaYatri", logoName: "nammayatri.png" }
];
