<template>
  <div class="cart-container">
    <h1>Shopping Cart</h1>

    <div v-if="cart.length" class="cart-content">
      <div class="cart-items">
        <ul>
          <li v-for="item in cart" :key="item.id" class="cart-item">
            <img :src="item.product.imageUrl" :alt="item.product.name" loading="lazy" />

            <div class="item-details">
              <h3>{{ item.product.name }}</h3>
              <p>${{ item.product.price.toFixed(2) }}</p>
            </div>

            <div class="quantity-controls">
              <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>

            <div class="item-total">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </div>

            <button @click="removeFromCart(item.id)" class="remove-button">
              Remove
            </button>
          </li>
        </ul>
      </div>

      <div class="cart-summary">
        <div class="total">
          <span>Total:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        <button @click="placeOrder" class="order-button">
          Place Order
        </button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/">Continue Shopping</router-link>
    </div>

    <dialog open v-if="showOrderSuccess" class="modal-overlay">
      <div class="modal">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase.</p>
        <button @click="closeOrderSuccess" class="continue-button">
          Continue Shopping
        </button>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { EcwidService } from '@/services/EcwidService';
import type { CartItem } from "@/types";
const router = useRouter();
const cart = ref<CartItem[]>([]);
const showOrderSuccess = ref(false);

const cartTotal = computed(() => EcwidService.calculateCartTotal(cart.value));

const loadCart = () => {
  cart.value = EcwidService.getStoredCart();
};

const updateQuantity = (itemId: number, quantity: number) => {
  cart.value = EcwidService.updateCartItemQuantity(itemId, quantity);
};

const removeFromCart = (itemId: number) => {
  cart.value = EcwidService.removeFromCart(itemId);
};

const placeOrder = () => {
  cart.value = EcwidService.clearCart();
  showOrderSuccess.value = true;
};

const closeOrderSuccess = () => {
  showOrderSuccess.value = false;
  router.push('/');
};

onMounted(loadCart);
</script>

<style scoped>
.cart-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .cart-content {
    display: grid;
    gap: 20px;

    .cart-items ul {
      list-style: none;
      padding: 0;

      li.cart-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border-bottom: 1px solid #eee;

        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .item-details {
          flex-grow: 1;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;

          button {
            padding: 5px 10px;
            border: 1px solid #ddd;
          }

        }

        .item-total {
          min-width: 100px;
          text-align: right;
        }

        .remove-button {
          color: red;
        }
      }

      .cart-summary {
        padding: 20px;
        border: 1px solid #eee;

        .total {
          display: flex;
          justify-content: space-between;
          font-size: 1.2em;
          margin-bottom: 20px;
        }

        .order-button {
          width: 100%;
          padding: 10px;
          background: blue;
          color: white;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
}

.empty-cart {
  text-align: center;
  padding: 40px;
}

.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  .modal {
    padding: 20px;
    border-radius: 8px;
    text-align: center;

    .continue-button {
      margin-top: 20px;
      padding: 10px 20px;
      background: blue;
      color: white;
      border: none;
      cursor: pointer;
    }
  }

}




@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-total {
    text-align: left;
  }
}
</style>
