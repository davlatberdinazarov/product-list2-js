import { cart } from '../main.js';
// Find total price
const findTotalPrice = () => {
  let totalPriceCount = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return totalPriceCount.toFixed(2);
};

export default findTotalPrice;