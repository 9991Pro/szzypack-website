export interface ProductSpecifications {
  material?: string;
  sizes?: string;
  thickness?: string;
  moq?: string;
  leadTime?: string;
  printing?: string;
  closure?: string;
  finishing?: string;
  [key: string]: string | undefined;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  specifications: ProductSpecifications;
  industries: string[];
  features: string[];
  relatedProducts: string[];
  content: string;
}
