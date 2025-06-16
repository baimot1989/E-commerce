import { useCallback, useEffect, useMemo, useState } from "react";
import FilterBar from '../components/filterBar';
import ProductList from '../components/productList';
import { useFetchData } from "../../hooks/fetchData";
import { Button, Drawer, Typography, IconButton, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from "@mui/system";
import ShoppingCartDrawer from "../components/shopingCart";
import ShoppingCart from "../components/shopingCart";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../../redux/cart/cartSlice";


// const useStyles = makeStyles({
//     drawer: {
//         width: '50%',
//     },
//     drawerPaper: {
//         width: '50%'
//     }
// })

const ProductPage = () => {
    const { data: categories = [], isloading: loadingCategories } = useFetchData('http://localhost:3000/categories');
    const { data: products = [], isloading: loadingProducts } = useFetchData('http://localhost:3000/products');
    const dispatch = useDispatch();
    const cartOpen = useSelector(state => state.cart.cartOpen);

    const [filtered, setFiltered] = useState([]);
    // const [cartOpen, setCartOpen] = useState(false)

    const openDrawer = () => {
        setCartOpen(true);
    };

    // const classes = useStyles()



    const maxPrice = useMemo(() => {
        if (products.length === 0) return 0;
        return Math.max(...products.map(p => Number(p.price)));
    }, [products])

    useEffect(() => {
        setFiltered(products);
    }, [products]);



    const handleFilterChange = useCallback(({ category, price, title }) => {
        const filteredData = products.filter((product) => {
            const matchCategory = category === 'All' || product.category == category;
            const matchPrice = product.price <= price;
            const matchTitle = product.title.toLowerCase().includes(title.toLowerCase());
            return matchCategory && matchTitle && matchPrice;
        });

        setFiltered(filteredData);
    }, [products]);

    if (loadingProducts || loadingCategories) return <p>Loading...</p>;

    return (
        <div>
            <FilterBar
                categories={['All', ...categories]}
                maxPrice={maxPrice}
                onFilterChange={handleFilterChange}
            />
            <ProductList products={filtered} />
            
        </div>
    );
};

export default ProductPage;
