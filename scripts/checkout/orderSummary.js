import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {renderPaymentSummary} from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartHTML = '';

  cart.forEach(({productId, quantity, deliveryOptionId}) => {
    const product = getProduct(productId);
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    cartHTML += `
    <div class="cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${getDeliveryDate(deliveryOption.deliveryDays)}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${product.image}">
        <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(productId, deliveryOptionId)}
        </div>
      </div>
    </div>
  `;
  });

  function deliveryOptionsHTML(productId, deliveryOptionId) {
    let html = '';


    deliveryOptions.forEach(option => {
      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${option.id}">
        <input type="radio" 
          ${deliveryOptionId === option.id ? 'checked' : ''}  
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            ${getDeliveryDate(option.deliveryDays)}
          </div>
          <div class="delivery-option-price">
            ${option.priceCents === 0 ? 'FREE' : `$${option.priceCents / 100} -`} Shipping
          </div>
        </div>
      </div>
    `;
    });

    return html;
  }

  function getDeliveryDate(days) {
    const today = dayjs();
    const deliveryDate = today.add(days, 'days');
    return deliveryDate.format('dddd, MMMM D');
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartHTML;

  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;
        removeFromCart(productId);

        const container = document.querySelector(`.cart-item-container-${productId}`);
        container.remove();
        
        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}