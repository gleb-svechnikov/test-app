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

  static getStoredCart(): CartItem[] {
    const cart = localStorage.getItem(this.getStorageKey());
    return cart ? JSON.parse(cart) : [];
  }

  private static saveCart(cart: CartItem[]) {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(cart));
  }

  static async addToCart(productId: number): Promise<CartItem[]> {
    const cart = this.getStoredCart();
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const product = await this.getProduct(productId);
      cart.push({
        id: Date.now(),
        product,
        quantity: 1
      });
    }

    this.saveCart(cart);
    return cart;
  }

  static removeFromCart(itemId: number): CartItem[] {
    const cart = this.getStoredCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  static updateCartItemQuantity(itemId: number, quantity: number): CartItem[] {
    const cart = this.getStoredCart();
    const item = cart.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart(cart);
    }
    return cart;
  }

  static clearCart(): CartItem[] {
    localStorage.removeItem(this.getStorageKey());
    return [];
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

export const useEcwidApi = () => {

  const getStoredCart = (): CartItem[] => {
    const cart = localStorage.getItem(`ecwid_${API_CONFIG.STORE_ID}_cart`);
    return cart ? JSON.parse(cart) : [];
  };

  const saveCart = (cart: CartItem[]) => {
    localStorage.setItem(`ecwid_${API_CONFIG.STORE_ID}_cart`, JSON.stringify(cart));
  };

  const addToCart = async (productId: number) => {
    const cart = getStoredCart();
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const product = await EcwidService.getProduct(productId);
      cart.push({
        id: Date.now(),
        product,
        quantity: 1
      });
    }

    saveCart(cart);
    return cart;
  };

  const removeFromCart = (itemId: number) => {
    const cart = getStoredCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    saveCart(updatedCart);
    return updatedCart;
  };

  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    const cart = getStoredCart();
    const item = cart.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      saveCart(cart);
    }
    return cart;
  };

  const clearCart = () => {
    localStorage.removeItem(`ecwid_${API_CONFIG.STORE_ID}_cart`);
    return [];
  };

  const calculateCartTotal = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return {
    getStoredCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    calculateCartTotal,
  };
};

export type { Category, Product, CartItem };