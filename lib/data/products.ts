export type ProductShape = "round" | "bread" | "carton";

export interface Product {
  name: string;
  discount: string;
  newPrice: string;
  oldPrice: string;
  expiry: string;
  color: string;
  shape: ProductShape;
}

export const products: Product[] = [
  { name: "Sourdough Loaf", discount: "-40%", newPrice: "$2.40", oldPrice: "$4.00", expiry: "Best by tomorrow", color: "#E85D2F", shape: "bread" },
  { name: "Ripe Avocados (3pk)", discount: "-55%", newPrice: "$1.80", oldPrice: "$4.00", expiry: "Best by today", color: "#3D8B5F", shape: "round" },
  { name: "Fresh Milk 1L", discount: "-30%", newPrice: "$2.10", oldPrice: "$3.00", expiry: "Best by 2 days", color: "#FFFFFF", shape: "carton" },
  { name: "Mixed Bell Peppers", discount: "-45%", newPrice: "$1.65", oldPrice: "$3.00", expiry: "Best by tomorrow", color: "#E85D2F", shape: "round" },
  { name: "Free-Range Eggs (6pk)", discount: "-35%", newPrice: "$2.60", oldPrice: "$4.00", expiry: "Best by 3 days", color: "#F0C419", shape: "carton" },
  { name: "Cherry Tomatoes", discount: "-50%", newPrice: "$1.50", oldPrice: "$3.00", expiry: "Best by today", color: "#E85D2F", shape: "round" },
  { name: "Wholegrain Bread", discount: "-40%", newPrice: "$2.10", oldPrice: "$3.50", expiry: "Best by tomorrow", color: "#C8F169", shape: "bread" },
  { name: "Broccoli Crowns", discount: "-45%", newPrice: "$1.40", oldPrice: "$2.50", expiry: "Best by 2 days", color: "#3D8B5F", shape: "round" },
];
