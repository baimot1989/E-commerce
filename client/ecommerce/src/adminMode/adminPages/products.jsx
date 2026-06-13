import { useFetchData } from '../../hooks/fetchData';
import { useState, useEffect } from 'react';
import AddProduct from '../components/addProduct';
import { setModalMassgae, setOpenModal } from '../../redux/modal/modalSlice';
import { useDispatch } from 'react-redux';
import UpdateProducts from '../components/updateProduct';

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
    const { data: products, updateData, addData, deleteData } = useFetchData(`${API_URL}/products`);
    const { data: categories } = useFetchData(`${API_URL}/categories`);
    const dispatch = useDispatch();

    const [addOrUpdate, setAddOrUpdate] = useState(false);

     const requestValidation = (formValues) => {
        const { title, price, imagesSrc, description, category, inStock } = formValues

        if (
            title.trim() === '' ||
            price === '' ||
            description.trim() === '' ||
            category === '' ||
            inStock === ''
          ) {
            dispatch(setModalMassgae("All fields must be filled."));
            dispatch(setOpenModal());
            return false;
          }

        const stock = Number(inStock);
        const priceValue = Number(price);

        if (isNaN(stock) || isNaN(priceValue)) {
            dispatch(setModalMassgae("Price and Stock must be valid numbers."));
            dispatch(setOpenModal());
            return false;
          }
          
          if (stock < 0 || priceValue < 0) {
            dispatch(setModalMassgae("Price and Stock must be greater than or equal to 0."));
            dispatch(setOpenModal());
            return false;
          } 
          return true
     }

    const createProduct = () => {
        setAddOrUpdate(!addOrUpdate);
    };
    return (
        <>
            {addOrUpdate ? (
                <AddProduct 
                categories={categories} 
                createProduct={createProduct} 
                addData={addData} 
                requestValidation={requestValidation} />
            ) : (
                <UpdateProducts
                    products={products}
                    categories={categories}
                    createProduct={createProduct}
                    updateData={updateData}
                    deleteData={deleteData}
                    requestValidation={requestValidation}
                />
            )}
        </>
    );
};

export default Products;
