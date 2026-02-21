// import { saveCart } from "./cartService";

// // 🔥 shared timer
// let timer = null;

// export const saveCartDebounce = (cart) => {
//   if (timer) {
//     clearTimeout(timer);
//   }

//   timer = setTimeout(() => {
//     saveCart(cart); // firebase call
//     // console.log("🔥 cart synced (debounced)");
//   }, 800);
// };



let timer = null;

export const saveCartDebounce = (cart) => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    try {
      await saveCart(cart);
      console.log("🔥 cart synced");
    } catch (err) {
      console.error("debounce error", err);
    }
  }, 700);
};