import { cartService } from "../../services/cartService";


let timer = null;

export const saveCartDebounce = (cart, user) => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    try {
      await cartService.saveCart(cart, user);

    } catch (err) {
      console.error("debounce error", err);
    }
  }, 700);
};

