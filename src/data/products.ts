export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating?: number;
  reviews?: number;
  inStock: boolean;
  featured: boolean;
  new: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Alligator Strap",
    slug: "classic-alligator-strap",
    price: 185.0,
    originalPrice: 210.0,
    category: "Leather",
    image: "/images/img1.jpg",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg"
    ],
    description:
      "Genuine alligator leather strap, hand-stitched with waxed linen thread. The ultimate upgrade for dress watches.",
    details: ["American Alligator", "Hand-stitched", "Hypoallergenic lining", "Stainless steel buckle"],
    rating: 4.9,
    reviews: 84,
    inStock: true,
    featured: true,
    new: true
  },
  {
    id: "2",
    name: "Shell Cordovan Strap",
    slug: "shell-cordovan-strap",
    price: 145.00,
    category: "Leather",
    image: "/images/img2.jpg",
    images: [
      "/images/img2.jpg",
      "/images/img3.jpg"
    ],
    description:
      "Horween Shell Cordovan leather known for its durability and unique non-creasing characteristics.",
    details: ["Horween Shell Cordovan", "Unlined for comfort", "Hand-finished edges", "Polished buckle"],
    inStock: true,
    featured: true,
    new: false
  },
  {
    id: "3",
    name: "Vintage Suede Strap",
    slug: "vintage-suede-strap",
    price: 85.00,
    category: "Suede",
    image: "/images/img3.jpg",
    images: [
      "/images/img3.jpg",
      "/images/img1.jpg"
    ],
    description:
      "Soft Italian suede with a vintage taper. Perfect for chronographs and field watches.",
    details: ["Italian Suede", "Tapered cut", "Quick-release spring bars", "Matching stitching"],
    inStock: true,
    featured: true,
    new: false
  },
  {
    id: "4",
    name: "Sport Rubber Strap",
    slug: "sport-rubber-strap",
    price: 65.00,
    category: "Rubber",
    image: "/images/img1.jpg",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg"
    ],
    description:
      "High-performance FKM rubber strap. Waterproof, dust-proof, and extremely comfortable.",
    details: ["FKM Rubber", "Waterproof", "Curved ends", "Brushed hardware"],
    inStock: true,
    featured: true,
    new: true
  },
  {
    id: "5",
    name: "NATO Nylon Strap",
    slug: "nato-nylon-strap",
    price: 45.00,
    category: "Nylon",
    image: "/images/img2.jpg",
    images: [
      "/images/img2.jpg",
      "/images/img3.jpg"
    ],
    description:
      "Military-grade nylon NATO strap. Secure, durable, and available in multiple colors.",
    details: ["Ballistic Nylon", "Heat-sealed holes", "316L Stainless Steel", "280mm length"],
    inStock: true,
    featured: false,
    new: false
  }
];

export const categories = [
  { name: "All", slug: "all" },
  { name: "Leather", slug: "leather" },
  { name: "Suede", slug: "suede" },
  { name: "Rubber", slug: "rubber" },
  { name: "Nylon", slug: "nylon" }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.new);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};
