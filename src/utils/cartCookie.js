// src/utils/cartCookie.js
import Cookies from 'js-cookie';

const CART_COOKIE = 'cart_items';

export const getCartFromCookies = () => {
  const data = Cookies.get(CART_COOKIE);
  return data ? JSON.parse(data) : [];
};

export const addToCart = (product, quantity = 1, color = null, size = null) => {
  const cart = getCartFromCookies();

  const existing = cart.find(item =>
    item.product.id === product.id &&
    item.color === color &&
    item.size === size
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity, color, size });
  }

  Cookies.set(CART_COOKIE, JSON.stringify(cart), { expires: 7 });
};

export const updateCartItem = (productId, color = null, size = null, newQty) => {
  const cart = getCartFromCookies().map(item => {
    if (
      item.product.id === productId &&
      item.color === color &&
      item.size === size
    ) {
      item.quantity = newQty;
    }
    return item;
  });

  Cookies.set(CART_COOKIE, JSON.stringify(cart), { expires: 7 });
};

export const removeCartItem = (productId, color = null, size = null) => {
  const cart = getCartFromCookies().filter(item =>
    !(item.product.id === productId &&
      item.color === color &&
      item.size === size)
  );

  Cookies.set(CART_COOKIE, JSON.stringify(cart), { expires: 7 });
};

export const clearCart = () => {
  Cookies.remove(CART_COOKIE);
};
