<template>
    <div class="cart-container">
        <h1>Shopping Cart</h1>

        <div v-if="cart.length" class="cart-content">
            <div class="cart-items">
                <ul>
                    <li v-for="item in cart" :key="item.id" class="cart-item">
                        <img
                            :src="item.product.thumbnailUrl"
                            :alt="item.product.name"
                            loading="lazy"
                        />

                        <div class="item-details">
                            <h3>
                                <RouterLink :to="`/items/${item.product.id}`">
                                    {{ item.product.name }}
                                </RouterLink></h3>
                            <p>${{ item.product.price.toFixed(2) }}</p>
                        </div>

                        <div class="quantity-controls">
                            <button @click="updateQuantity(item.id, item.quantity - 1)" type="button">-</button>
                            <input
                                type="number"
                                v-model="item.quantity"
                                step="1"
                                min="1"
                            />
                            <button @click="updateQuantity(item.id, item.quantity + 1)"  type="button">+</button>
                        </div>
                        <div class="item-total">
                            ${{
                                (item.product.price * item.quantity).toFixed(2)
                            }}
                        </div>

                        <button
                            @click="removeFromCart(item.id)"
                            class="remove-button"
                            type="reset"
                        >
                        ❌ Remove
                        </button>
                    </li>
                </ul>
            </div>

            <div class="cart-summary">
                <div class="total">
                    <span>Total:</span>
                    <span>${{ cartTotal.toFixed(2) }}</span>
                </div>
                <button @click="placeOrder" class="order-button" type="button">
                    Place Order
                </button>
            </div>
        </div>

        <div v-else class="empty-cart">
            <p>Your cart is empty</p>
            <router-link to="/">Continue shopping</router-link>
        </div>

        <dialog open v-if="showOrderSuccess" class="modal-overlay">
            <div class="modal">
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase.</p>
                <button @click="closeOrderSuccess" type="button" class="continue-button">
                    Continue shopping
                </button>
            </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { EcwidService } from "@/services/EcwidService";
import type { CartItem } from "@/types";
const router = useRouter();
const cart = ref<CartItem[]>([]);
const showOrderSuccess = ref(false);

const cartTotal = computed(() => EcwidService.calculateCartTotal(cart.value));

const loadCart = () => {
    cart.value = EcwidService.getCurrentCart();
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
    router.push("/");
};

onMounted(loadCart);
</script>

<style scoped>
.cart-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    .cart-content {
        display: grid;
        gap: 2rem;

        .cart-items ul {
            list-style: none;
            padding: 0;

            li.cart-item {
                display: flex;
                align-items: center;
                gap: 2rem;
                padding: 2rem;
                border-bottom: 1px solid #eee;

                img {
                    width: auto;
                    height: 100px;
                    object-fit: cover;
                    &:hover{
                      transform: scale(4);
                    }
                }

                .item-details {
                    flex-grow: 1;
                }

                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    input[type='number'] {
                      position: relative;
                      text-align: center;
                      width: 5ch;
                    }
                    input[type=number]::-webkit-inner-spin-button,
                    input[type=number]::-webkit-outer-spin-button{
                      appearance: none;
                    }
                }

                .item-total {
                    min-width: 100px;
                    text-align: right;
                }

                
            }

           
        }
        .cart-summary {
          text-align: right;
           .total {
               display: flex;
               justify-content: space-between;
               font-size: 1.5rem;
               margin-bottom: 20px;
           }
           button{
            font-size: 1.5rem;
           }
       }
    }
    dialog {
        background: Canvas;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    
        .modal {
            padding: 2rem;
            text-align: center;
            h2{
                font-size: 2rem;
                margin-bottom: 2rem;
            }
            .continue-button {
                margin-top: 20px;
                padding: 1rem 2rem;
                font-size: 1.5rem;
                border: none;
                cursor: pointer;
            }
        }
     
    }
}

.empty-cart {
    text-align: center;
    padding: 40px;
}



@media (width < 1024px) {
    .cart-item {
        flex-direction: column;
        align-items: flex-start;
        text-align: center;
        .item-total {
            text-align: center !important;
            font-size: 1.5rem;
        }
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            input[type='number'] {
                font-size: 1.75rem;
            }
            button{
                font-size: 1.25rem;
                font-weight: bold;
                padding: 0.5rem 2rem;
            }
            
        }
        .remove-button{
            font-size: 1.5rem;
        }
    }
    .modal-overlay{
        width: 100%;
    }
    
}
</style>
