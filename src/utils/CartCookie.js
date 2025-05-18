import Cookies from 'js-cookie';

const CART_COOKIE = 'cart_items';

export const getCartFromCookies = () => {
  const data = Cookies.get(CART_COOKIE);
  return data ? JSON.parse(data) : [];
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCartFromCookies();
  const existing = cart.find(item => item.product.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  Cookies.set(CART_COOKIE, JSON.stringify(cart), { expires: 7 });
};

export const removeFromCart = (productId) => {
  const cart = getCartFromCookies().filter(item => item.product.id !== productId);
  Cookies.set(CART_COOKIE, JSON.stringify(cart), { expires: 7 });
};

export const clearCart = () => {
  Cookies.remove(CART_COOKIE);
};
