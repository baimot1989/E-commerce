import React from 'react';
import ProductCard from './productCard';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

const ProductList = ({ products }) => {
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <Container>
            <Grid container spacing={2} sx={{justifyContent: 'flex-start', my: 3}}>
                {products.map(product => (
                    <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
