export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart =
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

export function addToCart(productId) {
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  const exists = cart.find(x => x.productId === productId);
  if (exists) {
    exists.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const index = cart.findIndex(x => x.productId === productId);

  if (index === -1) {
    return;
  }

  cart.splice(index, 1);

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
1

export function updateDeliveryOption(productId, deliveryOptionId) {
  const cartItem = cart.find(x => x.productId === productId);

  cartItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
}
