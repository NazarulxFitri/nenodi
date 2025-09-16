export interface Product {
  id: number;
  imgSrc: string;
  name: string;
  bestSeller: boolean;
  variants: ProductVariant[];
}

export interface ProductVariant {
  variantId: number;
  name: string;
  price: number;
}
