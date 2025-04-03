

  export type Category = {
    id: number;
    name: string;
    imageUrl?: string;
    description?: string;
    parentId?: number;
  }
  export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryIds?: number[];
    thumbnailUrl: string;
  }

  export type CartItem = {
    id: number;
    quantity: number;
    product: Product;
  }
