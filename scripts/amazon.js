﻿import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach(product => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>
    
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
    
      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
    
      <div class="product-price">
        $${product.priceCents / 100}
      </div>
    
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    
      <div class="product-spacer"></div>
    
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>
    
      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
`;
});

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(x => {
    cartQuantity += x.quantity;
  })

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

const addedTimeouts = {};
function showAddedLabel(productId) {
  const jsAddedSelector =`.js-added-to-cart-${productId}`;

  document.querySelector(jsAddedSelector)
    .classList.add('visible');

  if (addedTimeouts[productId]) {
    clearTimeout(addedTimeouts[productId]);
  }

  addedTimeouts[productId] = setTimeout(() => {
    document.querySelector(jsAddedSelector)
      .classList.remove('visible');
  }, 1000);
}

document
  .querySelectorAll('.js-add-to-cart')
  .forEach(button => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      
      addToCart(productId);
      
      updateCartQuantity();
      
      showAddedLabel(productId);
    });
  });