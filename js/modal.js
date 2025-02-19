import { cart } from '../main.js';
import findTotalPrice from "./utils.js";


const renderModalItems = () => {
  let modalItemsWrapper = document.querySelector(".modal-wrapper-list");
  modalItemsWrapper.innerHTML = "";

  cart.forEach((el, index) => {
    let modalLi = document.createElement("li");
    modalLi.classList.add("modal-cart-item");

    modalLi.innerHTML = `
              <div class="modal-items">
                <img
                  class="modal-cart-img"
                  src="${el.image.desktop}"
                  alt="dessert"
                />
                <div class="modal-cart-info">
                  <h3>${el.name}</h3>
                  <div class="cart_item_info">
                    <span class="quantity">x${el.quantity}</span>
                    •
                    <span class="price">$${el.price}</span>
                  </div>
                </div>
              </div>
              <div>$${el.quantity * el.price}</div>
    `;

    // total price:
    let totalPrice = document.querySelector("#total-price-modal");
    totalPrice.innerText = `$${findTotalPrice()}`;

    modalItemsWrapper.appendChild(modalLi);
  });
};


export default renderModalItems;