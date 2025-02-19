import { cart } from "../main.js";
import { displayCards } from "./display.js";
import findTotalPrice from "./utils.js";

let listWrapper = document.querySelector(".wrapper-list");

const renderCartProducts = () => {
  // Kartalar uzunligini yangilash
  let cartLength = document.querySelector("#count_cart");
  cartLength.innerText = cart.length;

  // Elementlarni aniqlash
  let orderSection = document.querySelector(".order-section");
  let emptyCartSection = document.querySelector(".empty-cart");

  // Kartalar mavjudligini tekshirish
  if (cart.length > 0) {
    // Bo'sh kartani yashirish
    emptyCartSection.classList.add("js-display");
    orderSection.classList.remove("js-display");

    listWrapper.innerHTML = "";
    cart.forEach((el, index) => {
      let productList = document.createElement("div");
      productList.classList.add("your-products-li");

      productList.innerHTML = `
        <li class="cart_item">
          <div>
            <h3>${el.name}</h3>
            <div class="cart_item_info">
              <span class="quantity">x${el.quantity}</span>
              •
              <span class="total-price">$${(el.price * el.quantity).toFixed(
                2
              )}</span>
              •
              <span class="price">$${el.price.toFixed(2)}</span>
            </div>
          </div>
          <button class="remove_item">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>
      `;

      let removeBtn = productList.querySelector(".remove_item");

      removeBtn.addEventListener("click", () => {
        let itemIndex = cart.findIndex((item) => item.name === el.name);
        if (itemIndex !== -1) {
          cart.splice(itemIndex, 1); // Elementni olib tashlaymiz
        }

        console.log(cart);
        // UI-ni qayta chizish
        displayCards();
        renderCartProducts();
      });

      // total price:
      let totalPrice = document.querySelector("#total-price");
      totalPrice.innerText = `$${findTotalPrice()}`;

      listWrapper.appendChild(productList);
    });
  } else {
    // Order bo'limini yashirish
    emptyCartSection.classList.remove("js-display");
    orderSection.classList.add("js-display");
  }
};

export default renderCartProducts;
