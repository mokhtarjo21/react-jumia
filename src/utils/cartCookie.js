import Cookies from 'js-cookie';
import { instance } from "../axiosInstance/instance";
const CART_COOKIE = 'cart_items';
const access =localStorage.getItem('access')
export const getCartFromCookies = () => {
  const data = Cookies.get(CART_COOKIE);
  return data ? JSON.parse(data) : [];
};
export const fetchCartFromBackend = async () => {
  try {
    const response = await instance.get('/api/cart/', {
      headers: {
        'Authorization': `Bearer ${access}`,
      }
    });
    if (response.status === 200) {
      
  
    const items = response.data.items || [];

   console.log('Fetched cart items:', items);
    const cookieItems = items.map(item => ({
     
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.sale_price || item.product.price, // لو عدلتها في الباك إند
        image: item.product.product_images[0].image || null, // عدل حسب الـ Serializer
      },
      quantity: item.quantity,
      color: item.colors,
      size: item.size
    }));
    console.log('Mapped cart items for cookies:', cookieItems);
    Cookies.set(CART_COOKIE, JSON.stringify(cookieItems), { expires: 7 });

    return cookieItems;
    } else {
      console.error('Failed to fetch cart from backend');
      return [];
    }
  } catch (error) {
    console.error('Error fetching cart from backend:', error);
    return [];
  }
};

export const addToCart = async(product, quantity = 1, color = null, size = null) => {
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
  try {
    const access =localStorage.getItem('access')
    await instance.post('/api/cart/add/', {
      product_id: product.id,
      quantity,
      colors: color,
      size
    },{
              headers: {
                'Authorization': `Bearer ${access}`,
                 
              }});
  } catch (error) {
    console.error('Error syncing addToCart with backend:', error);
  }
};

export const updateCartItem = async(productId, color = null, size = null, newQty) => {
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
  try {
   const access =localStorage.getItem('access')
    await instance.put(`/api/cart/update/${productId}/`, {
      product_id: productId,
      colors: color,
      size: size,
      quantity: newQty
    },{
              headers: {
                "Authorization": `Bearer ${access}`,
                "Content-Type": "application/json"
                 
              }});
  } catch (error) {
    console.error('Error syncing updateCartItem with backend:', error);
  }
};

export const removeCartItem =async (productId, color = null, size = null) => {
  const cart = getCartFromCookies().filter(item =>
    !(item.product.id === productId &&
      item.color === color &&
      item.size === size)
  );

  Cookies.set(CART_COOKIE, JSON.stringify(cart), { expires: 7 });
  try {
  const access = localStorage.getItem('access');
  await instance.delete(`/api/cart/remove/${productId}/`, {
    data: {
      colors: color,
      size: size
    },
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json"
    }
  });
} catch (error) {
  console.error('Error syncing removeCartItem with backend:', error);
}
};
export const deletecart= ()=>{Cookies.remove(CART_COOKIE);}
export const clearCart = async() => {
  Cookies.remove(CART_COOKIE);
  try {
    await instance.delete('/api/cart/clear/',{
              headers: {
                'Authorization': `Bearer ${access}`,
                 
              }});
  } catch (error) {
    console.error('Error syncing clearCart with backend:', error);
  }
};
