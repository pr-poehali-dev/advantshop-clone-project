export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  status: 'active' | 'draft' | 'outofstock';
  image: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  productsCount: number;
}