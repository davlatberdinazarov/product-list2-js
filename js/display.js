import { data } from './data.js';
import { cart } from '../main.js';
import renderCartProducts from './renderCarts.js';

// VARIABLES
let cardsWrapper = document.querySelector("#main");

export const displayCards = () => {
  cardsWrapper.innerHTML = "";

  data.forEach((el, idx) => {
    let isInCart = cart.find((c) => c.name === el.name);
    let quantity = isInCart ? isInCart.quantity : 0;
    // Yangi karta elementini yaratamiz
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="img-container">
      <img src="${el.image.desktop}" alt="${el.name}" />
      <button class="add-btn ${
        quantity > 0 ? "js-display" : ""
      }">Add to cart</button>
      <div class="btn-group ${quantity > 0 ? "" : "js-display"}">
        <button class="increment-btn">+</button>
        <span id="quantity-${idx + 1}">${quantity}</span>
        <button class="decrement-btn">-</button>
      </div> 
    </div>
    <h3>${el.name}</h3>
    <p>$${el.price}</p>
  `;

    // HTML elementlarini aniqlaymiz
    let addBtn = card.querySelector(".add-btn");
    let btnGroup = card.querySelector(".btn-group");
    let incrementBtn = card.querySelector(".increment-btn");
    let decrementBtn = card.querySelector(".decrement-btn");

    // "Add to cart" tugmasiga event listener qo'shamiz
    addBtn.addEventListener("click", () => {
      let isExisting = cart.find((c) => c.name === el.name);
      console.log("IsExisting: ", isExisting);
      if (!isExisting) {
        // Agar element hali kartaga qo'shilmagan bo'lsa
        cart.push({ ...el, quantity: 1 });
      } else {
        // Agar element allaqachon kartada bo'lsa, uning miqdorini oshiramiz
        isExisting.quantity++;
      }

      console.log("cart: ", cart);

      // Kartani yangilash
      isInCart = cart.find((c) => c.name === el.name);
      quantity = isInCart ? isInCart.quantity : 0;
      console.log("Yangilangan cart:", cart);

      // UI ni yangilash
      addBtn.classList.add("js-display");
      btnGroup.classList.remove("js-display");
      card.querySelector(`#quantity-${idx + 1}`).innerText = quantity;
      renderCartProducts();
    });

    // "Increment" tugmasiga event listener qo'shamiz
    incrementBtn.addEventListener("click", () => {
      let isExisting = cart.find((c) => c.name === el.name);
      if (isExisting) {
        isExisting.quantity++;
        quantity = isExisting.quantity;
        console.log("Yangilangan cart:", cart);

        // UI ni yangilash
        card.querySelector(`#quantity-${idx + 1}`).innerText = quantity;
      }
      renderCartProducts();
    });

    // "Decrement" tugmasiga event listener qo'shamiz
    decrementBtn.addEventListener("click", () => {
      let isExisting = cart.find((c) => c.name === el.name);
      if (isExisting && isExisting.quantity > 0) {
        isExisting.quantity--;
        quantity = isExisting.quantity;

        // Agar miqdor 0 bo'lsa, kartani yashiramiz
        if (quantity === 0) {
          cart = cart.filter((c) => c.name !== el.name);
          addBtn.classList.remove("js-display");
          btnGroup.classList.add("js-display");
        }

        // UI ni yangilash
        card.querySelector(`#quantity-${idx + 1}`).innerText = quantity;
        renderCartProducts();
        console.log("Yangilangan cart:", cart);
      }
    });

    // Tayyorlangan kartani `cardsWrapper` ga qo'shamiz
    cardsWrapper.appendChild(card);
  });
};