import Cookies from 'js-cookie';

const CART_COOKIE = 'cart_items';

/**
 * Retrieve cart items from cookies
 */
export const getCartFromCookies = () => {
  const data = Cookies.get(CART_COOKIE);
  return data ? JSON.parse(data) : [];
};

/**
 * Add a product to the cart with optional color/size and default quantity = 1
 */
export const addToCart = (product, quantity = 1, color = null, size = null) => {
  const cart = getCartFromCookies();

  // Only store essential product details
  const productSummary = {
    id: product.id,
    name: product.name,
    price: product.sale_price || product.price,
    image:
      product.product_images?.find((img) => img.is_primary)?.image ||
      product.product_images?.[0]?.image ||
      null,
  };

  // Check if the same product-color-size combo already exists
  const existing = cart.find(
    (item) =>
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
      size,
    });
  }

  Cookies.set(CART_COOKIE, JSON.stringify(cart), { expires: 7 });
};

/**
 * Update quantity of a specific cart item
 */
export const updateCartItem = (productId, color = null, size = null, newQty) => {
  const updatedCart = getCartFromCookies().map((item) => {
    if (
      item.product.id === productId &&
      item.color === color &&
      item.size === size
    ) {
      return { ...item, quantity: newQty };
    }
    return item;
  });

  Cookies.set(CART_COOKIE, JSON.stringify(updatedCart), { expires: 7 });
};

/**
 * Remove a specific cart item by product ID and options
 */
export const removeCartItem = (productId, color = null, size = null) => {
  const filteredCart = getCartFromCookies().filter(
    (item) =>
      !(
        item.product.id === productId &&
        item.color === color &&
        item.size === size
      )
  );

  Cookies.set(CART_COOKIE, JSON.stringify(filteredCart), { expires: 7 });
};

/**
 * Clear all cart items
 */
export const clearCart = () => {
  Cookies.remove(CART_COOKIE);
};
