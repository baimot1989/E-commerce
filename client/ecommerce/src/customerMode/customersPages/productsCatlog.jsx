import { useCallback, useEffect, useMemo, useState } from "react";
import FilterBar from '../components/filterBar';
import ProductList from '../components/productList ';
import { useFetchData } from "../../hooks/fetchData";
import { Button, Drawer, Typography, IconButton, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from "@mui/system";


const useStyles = makeStyles({
    drawer: {
        width: '50%',
    },
    drawerPaper: {
        width: '50%'
    }
})

const ProductPage = () => {
    const { data: categories = [], isloading: loadingCategories } = useFetchData('http://localhost:3000/categories');
    const { data: products = [], isloading: loadingProducts } = useFetchData('http://localhost:3000/products');

    const [filtered, setFiltered] = useState([]);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const classes = useStyles()



    const maxPrice = useMemo(() => {
        if (products.length === 0) return 0;
        return Math.max(...products.map(p => Number(p.price)));
    }, [products])

    useEffect(() => {
        setFiltered(products);
    }, [products]);



    const handleFilterChange = useCallback(({ category, price, title }) => {
        const filteredData = products.filter((product) => {
            console.log("Checking:", {
                productPrice: product.price,
                selectedPrice: price
            });
            const matchCategory = category === 'All' || product.category == category;
            const matchPrice = product.price <= price;
            const matchTitle = product.title.toLowerCase().includes(title.toLowerCase());
            return matchCategory && matchTitle && matchPrice;
        });
        console.log(filteredData)
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
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <ProductList products={filtered} />

            <Drawer className={classes.drawer}
                open={open}
                onClose={toggleDrawer(false)}
                classes={{ paper: classes.drawerPaper }}
            >
                <Typography variant="h4">Cart</Typography>
                <Grid container sx={{justifyContent: 'space-around'}}>
                    <Grid>
                        <Typography>title</Typography>
                    </Grid>

                    <Grid>
                        <Box
                            sx={{ flexDirection: 'row'}}
                        >

                            <AddIcon />

                            <Typography>5</Typography>

                            <RemoveIcon />

                            <Typography>units</Typography>
                        </Box>
                    </Grid>

                    <Grid><Typography>Total</Typography></Grid>

                    <Grid><DeleteForeverIcon /></Grid>
                </Grid>
            </Drawer>
        </div>
    );
};

export default ProductPage;
