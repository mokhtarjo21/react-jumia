import Cookies from 'js-cookie';

const CART_COOKIE = 'cart_items';

export const getCartFromCookies = () => {
  const data = Cookies.get(CART_COOKIE);
  return data ? JSON.parse(data) : [];
};

export const addToCart = (product, quantity = 1, color = null, size = null) => {
  const cart = getCartFromCookies();

  // أهم التفاصيل فقط
  const productSummary = {
    id: product.id,
    name: product.name,
    price: product.sale_price || product.price,
    image: product.product_images?.find(img => img.is_primary)?.image || product.product_images?.[0]?.image || null,
  };

  const existing = cart.find(item =>
    item.product.id === product.id &&
    item.color === color &&
    item.size === size
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      product: productSummary,
      quantity,
      color,
      size
    });
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
