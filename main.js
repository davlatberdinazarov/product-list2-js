const data = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

// VARIABLES
let cardsWrapper = document.querySelector("#main");

let cart = [];

const displayCards = () => {
  data.forEach((el, idx) => {
    isInCart = cart.find((c) => c.name === el.name);
    quantity = isInCart ? isInCart.quantity : 0;
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

let listWrapper = document.querySelector(".wrapper-list");
console.log(listWrapper);
// basket rendering function
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

    listWrapper.innerHTML = ''
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
              <span class="total-price">$${(el.price * el.quantity).toFixed(2)}</span>
              •
              <span class="price">$${el.price.toFixed(2)}</span>
            </div>
          </div>
          <button class="remove_item" onclick='removeFromCart("${el.name}")'>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>
      `;

      let removeBtn = productList.querySelector('.remove_item');
      removeBtn.addEventListener('click', () => {
        // Cartdan mahsulotni o'chirish
        cart = cart.filter((item) => item.name !== el.name);

        // UI-ni qayta chizish
        renderCartProducts();
      });

      listWrapper.appendChild(productList);
    });
  } else {
    // Order bo'limini yashirish
    emptyCartSection.classList.remove("js-display");
    orderSection.classList.add("js-display");
  }
};

// Elementni kartadan olib tashlash funksiyasi
// const removeFromCart = (name) => {
//   cart = cart.filter((item) => item.name !== name);
//   renderCartProducts();
//   displayCards(); // UIni yangilash
// };

displayCards();
renderCartProducts();
