import { Button, Container, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useFetchData } from '../../hooks/fetchData';
import { useState, useEffect } from 'react';
import TableComp from '../../components/tableComp';
import AddProduct from '../components/addProduct';
import { alignItems } from '@mui/system';

const Products = () => {
    const { data: products, updateData, addData, deleteData } = useFetchData('http://localhost:3000/products');
    const { data: categories } = useFetchData('http://localhost:3000/categories');
    console.log(products)

    const [categoriesById, setCategoriesById] = useState({});
    const [productForms, setProductForms] = useState({});
    const [addOrUpdate, setAddOrUpdate] = useState(false);

    // Initialize category values
    useEffect(() => {
        if (products.length && categories.length) {
            const initialState = {};
            products.forEach(product => {
                initialState[product._id] = product.category || '';
            });
            setCategoriesById(initialState);
        }
    }, [products, categories]);

    // Initialize other product details
    useEffect(() => {
        if (products.length) {
            const initialForms = {};
            products.forEach(product => {
                initialForms[product._id] = {
                    title: product.title || '',
                    price: product.price || '',
                    linkImage: product.linkImage || '',
                    description: product.description || '',
                    boughtBy: product.boughtBy
                };
            });
            setProductForms(initialForms);
        }
    }, [products]);

    const handleInputChange = (productId, field, value) => {
        setProductForms(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    const handleCategoryChange = (productId, value) => {
        setCategoriesById(prev => ({
            ...prev,
            [productId]: value
        }));
    };

    const updateProduct = (e, id) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.name;

        const selectedProduct = {
            ...productForms[id],
            category: categoriesById[id]
        };
        const { category, description, linkImage, price, title } = selectedProduct
        if (category === '' || description === '' || linkImage === '' || price === '' || title === '') {
            throw Error('All fields must be filled in.')
        }
        if (action === 'save') {
            updateData(id, selectedProduct);
        } else if (action === 'delete') {
            const confirmDelete = window.confirm("Are you sure you want to delete this product?");
            if (confirmDelete) {
                deleteData(id);
            }
        }
    };

    const createProduct = () => {
        setAddOrUpdate(!addOrUpdate);
    };

    const columns = [
        { label: "Full Name", accessor: "fullName" },
        { label: "Quantity", accessor: "quantity" },
        { label: "Date", accessor: "date" }
    ];

    return (
        <>
            {addOrUpdate ? (
                <AddProduct categories={categories} createProduct={createProduct} addData={addData} />
            ) : (
                <Container maxWidth="xl">
                    <Typography variant="h5" style={{marginBottom: '20', textAlign: 'center'}}>Products</Typography>
                    {products.map(item => (
                        <form key={item._id} onSubmit={(e) => updateProduct(e, item._id)} style={{ width: '80%', margin: '0 auto', marginTop: '30px' }}>
                            <Paper style={{ padding: '25px', backgroundColor: '#e3e6f0' }}>
                                <Typography variant="h6" gutterBottom>
                                    Editing Product: {productForms[item._id]?.title || ''}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            variant="outlined"
                                            value={productForms[item._id]?.title || ''}

                                            onChange={(e) => handleInputChange(item._id, 'title', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Price"
                                            variant="outlined"
                                            value={productForms[item._id]?.price || ''}

                                            onChange={(e) => handleInputChange(item._id, 'price', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Select
                                            fullWidth
                                            value={categoriesById[item._id] || ''}
                                            onChange={(e) => handleCategoryChange(item._id, e.target.value)}
                                            displayEmpty
                                            required
                                        >
                                            <MenuItem value="" disabled>
                                                Select Category
                                            </MenuItem>
                                            {categories.map(category => (
                                                <MenuItem key={category._id} value={category.categoryName}>
                                                    {category.categoryName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Image URL"
                                            variant="outlined"
                                            value={productForms[item._id]?.linkImage || ''}
                                            required
                                            onChange={(e) => handleInputChange(item._id, 'linkImage', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        {productForms[item._id]?.linkImage && (
                                            <img
                                                src={productForms[item._id].linkImage}
                                                alt="Preview"
                                                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', marginBottom: '15px' }}
                                            />
                                        )}
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                            value={productForms[item._id]?.description || ''}
                                            required
                                            onChange={(e) => handleInputChange(item._id, 'description', e.target.value)}
                                        />
                                    </Grid>
                                    
                                    <Grid size={{ xs: 12, md: 6 }} style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
                                        <Button type="submit" name="save" variant="contained" color="primary">
                                            Save
                                        </Button>
                                        <Button type="submit" name="delete" variant="contained" color="error">
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography variant='h5' style={{textAlign: 'center', margin:'5px'}}>Bought by</Typography>
                                        <TableComp columns={columns} data={item.boughtBy} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    ))}
                    <div style={{ width: '80%', margin: '15px auto'}}> <Button variant="contained" onClick={createProduct} style={{ marginTop: '30px' }}>
                        Add Product
                    </Button>
                    </div>
                </Container>
            )}
        </>
    );
};

export default Products;
