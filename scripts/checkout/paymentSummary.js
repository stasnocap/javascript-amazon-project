import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";

export function renderPaymentSummary() {
  let productSumCents = 0;
  let shippingSumCents = 0;
  let productsQuantity = 0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productSumCents += product.priceCents * cartItem.quantity;
    productsQuantity += cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingSumCents += deliveryOption.priceCents;
  });
  
  const totalBeforeTaxCents = productSumCents + shippingSumCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${productsQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productSumCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingSumCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
  
  console.log(productSumCents);
  console.log(shippingSumCents);
}