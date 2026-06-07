export const mergeCarts = (guestCart, userCart) => {
  const merged = [...userCart];

  guestCart.forEach((guestItem) => {
    const existing = merged.find(
      (item) => item._id === guestItem._id
    );
     console.log(existing)
    if (existing) {
      existing.quantity += guestItem.quantity;
    } else {
      merged.push(guestItem);
    }
  });
  console.log(merged)

  return merged;
};