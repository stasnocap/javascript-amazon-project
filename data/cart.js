export const cart = [];

export function addToCart(productId) {
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  const exists = cart.find(x => x.productId === productId);
  if (exists) {
    exists.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }
}