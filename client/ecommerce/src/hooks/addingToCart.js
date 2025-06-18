
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setModalMassgae, setOpenModal } from '../redux/modal/modalSlice';
// import { clearCartError, clearCartSuccess } from '../redux/cart/cartSlice';


// export const useAddToCart = () => {
//     const error = useSelector((state) => state.cart.error);
//     const success = useSelector((state) => state.cart.success);
//     const dispatch = useDispatch();
    
//     useEffect(() => {
//         if (error) {
//           dispatch(setModalMassgae(error));
//           dispatch(setOpenModal());
//           dispatch(clearCartError());
//         } else if (success) {
//           dispatch(setModalMassgae('המוצר נוסף בהצלחה'));
//           dispatch(setOpenModal());
//           dispatch(clearCartSuccess());
//         }
//       }, [error, success, dispatch]);
    
//     return 
// }