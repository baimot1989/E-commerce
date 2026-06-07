
// redux/cart/loadCartForUser.js

// localStorage פונקציה שטוענת את העגלת קניות של משתמש במערכת מה 
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

// localStorage פונקציה ששומרת את העגלת קניות של משתמש במערכת ב
export const saveCartForUser = (userId, cartItems) => {
  console.log(cartItems)
  try {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  } catch (err) {
    console.error('Cart save error:', err);
  }
};
