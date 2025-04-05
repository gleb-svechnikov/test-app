import { ref, readonly } from 'vue';
import type { CartItem, Product, Category } from "@/types";

const API_CONFIG = {
  STORE_ID: import.meta.env.VITE_ECWID_STORE_ID,
  TOKEN: import.meta.env.VITE_ECWID_TOKEN,
  BASE_URL: 'https://app.ecwid.com/api/v3',
} as const;

if (!API_CONFIG.STORE_ID || !API_CONFIG.TOKEN) {
  throw new Error('Missing required environment variables for Ecwid API');
}

const createApiUrl = (endpoint: string) =>
  `${API_CONFIG.BASE_URL}/${API_CONFIG.STORE_ID}${endpoint}`;

const headers = {
  Authorization: `Bearer ${API_CONFIG.TOKEN}`,
  'Content-Type': 'application/json',
};

const _cartRef = ref<CartItem[]>([]);

const _loadCartFromStorage = () => {
  const key = `ecwid_${API_CONFIG.STORE_ID}_cart`;
  const storedCart = localStorage.getItem(key);
  _cartRef.value = storedCart ? JSON.parse(storedCart) : [];
};

_loadCartFromStorage();

export const cartRef = readonly(_cartRef);

export class EcwidService {
  static async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(createApiUrl('/categories'), {
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async getCategory(categoryId: number): Promise<Category> {
    try {
      const response = await fetch(createApiUrl(`/categories/${categoryId}`), {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }

  static async getProducts(categoryId?: number): Promise<Product[]> {
    try {
      const url = new URL(createApiUrl('/products'));
      if (categoryId) {
        url.searchParams.append('category', categoryId.toString());
      }

      const response = await fetch(url.toString(), {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getProduct(productId: number): Promise<Product> {
    try {
      const response = await fetch(createApiUrl(`/products/${productId}`), {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  static async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const url = new URL(createApiUrl('/products'));
      url.searchParams.append('category', categoryId.toString());

      const response = await fetch(url.toString(), {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  private static getStorageKey() {
    return `ecwid_${API_CONFIG.STORE_ID}_cart`;
  }

  static getCurrentCart(): CartItem[] {
    return JSON.parse(JSON.stringify(_cartRef.value));
  }

  private static saveCart(cart: CartItem[]) {
    _cartRef.value = cart;
    localStorage.setItem(this.getStorageKey(), JSON.stringify(cart));
  }

  static async addToCart(productId: number): Promise<CartItem[]> {
    const cart = this.getCurrentCart();
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      try {
        const product = await this.getProduct(productId);
        cart.push({
          id: Date.now(),
          product,
          quantity: 1
        });
      } catch (error) {
        console.error(`Failed to fetch product ${productId} to add to cart:`, error);
        throw error;
      }
    }

    this.saveCart(cart);
    return this.getCurrentCart();
  }

  static removeFromCart(itemId: number): CartItem[] {
    let cart = this.getCurrentCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    this.saveCart(updatedCart);
    return this.getCurrentCart();
  }

  static updateCartItemQuantity(itemId: number, quantity: number): CartItem[] {
    let cart = this.getCurrentCart();
    const item = cart.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart(cart);
    }
    return this.getCurrentCart();
  }

  static clearCart(): CartItem[] {
    this.saveCart([]);
    return this.getCurrentCart();
  }

  static calculateCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  static async updateCategoryImage(categoryId: number, imageUrl: string): Promise<Category> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
          imageUrl
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating category image:', error);
      throw error;
    }
  }
}

export type { Category, Product, CartItem };