import { displayCards } from './js/display.js';
import renderCartProducts from "./js/renderCarts.js";
import renderModalItems from "./js/modal.js";
export let cart = [];

// modal rendering
let modalBackdrop = document.querySelector(".modal-backdrop");
let startNewOrderBtn = document.querySelector("#start-order-btn");
let modalCard = document.querySelector(".modal-card");
let confirmBtn = document.querySelector("#btn-confirm");

confirmBtn.addEventListener("click", () => {
  modalBackdrop.classList.remove("js-display");
  renderModalItems();
});

modalBackdrop.addEventListener("click", () => {
  modalBackdrop.classList.add("js-display");
  console.log("modalBackdrop clicked");
});

modalCard.addEventListener("click", (e) => {
  e.stopPropagation();
});

startNewOrderBtn.addEventListener("click", () => {
  modalBackdrop.classList.add("js-display");
  cart = [];
  displayCards();
  renderCartProducts();
});

displayCards();
renderCartProducts();
