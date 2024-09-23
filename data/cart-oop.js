function Cart(localStorageKey) {
  return {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems =
          [
            {
              productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity: 2,
              deliveryOptionId: '1'
            },
            {
              productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
              quantity: 1,
              deliveryOptionId: '2'
            }
          ];
      }
    },

    addToCart(productId) {
      const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      const exists = this.cartItems.find(x => x.productId === productId);
      if (exists) {
        exists.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const index = this.cartItems.findIndex(x => x.productId === productId);

      if (index === -1) {
        return;
      }

      this.cartItems.splice(index, 1);

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const cartItem = this.cartItems.find(x => x.productId === productId);

      cartItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    }
  };
}

const cart = Cart('cart-oop');

cart.loadFromStorage();