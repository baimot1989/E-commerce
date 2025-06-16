
// redux/cart/loadCartForUser.js
export const loadCartForUser = (userId) => {
  try {
    const raw = localStorage.getItem(`cart_${userId}`);
    const parsed = JSON.parse(raw);
    return parsed?.length ? parsed : null;
  } catch (err) {
    console.error('Cart load error:', err);
    return null;
  }
};

export const saveCartForUser = (userId, cartItems) => {
  try {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  } catch (err) {
    console.error('Cart save error:', err);
  }
};
