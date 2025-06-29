import { Box, Button, Container, Grid, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TableComp from "../../components/tableComp";
import { useEffect, useState } from "react";
import { setModalMassgae, setOpenModal } from "../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";

const UpdateProducts = ({ products, categories, createProduct, updateData, deleteData, requestValidation }) => {
    const dispatch = useDispatch();

    // State to hold form data for each product by product ID
    const [productForms, setProductForms] = useState({});

    // State to hold selected category for each product by product ID
    const [categoriesById, setCategoriesById] = useState({});

    // Initialize form data for all products when products prop changes
    useEffect(() => {
        if (products.length) {
            const initialForms = {};
            products.forEach(product => {
                initialForms[product._id] = {
                    title: product.title || '',
                    price: product.price || '',
                    inStock: product.inStock || '',
                    imagesSrc: product.imagesSrc && product.imagesSrc.length > 0 ? product.imagesSrc : [''], // support multiple
                    description: product.description || '',
                    boughtBy: product.boughtBy || [],
                };

            });
            setProductForms(initialForms);
        }
    }, [products]);

    // Initialize category selections for all products when products or categories change
    useEffect(() => {
        if (products.length && categories.length) {
            const initialState = {};
            products.forEach(product => {
                initialState[product._id] = product.category || '';
            });
            setCategoriesById(initialState);
        }
    }, [products, categories]);

    const handleImageChange = (productId, index, value) => {
        setProductForms(prev => {
            const updatedImages = [...(prev[productId].imagesSrc || [])];
            updatedImages[index] = value;
            return {
                ...prev,
                [productId]: {
                    ...prev[productId],
                    imagesSrc: updatedImages,
                }
            };
        });
    };
    const addImageField = (productId) => {
        setProductForms(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                imagesSrc: [...(prev[productId].imagesSrc || []), ''],
            }
        }));
    };

    const removeImageField = (productId, index) => {
        setProductForms(prev => {
            const updatedImages = [...(prev[productId].imagesSrc || [])];
            updatedImages.splice(index, 1);
            return {
                ...prev,
                [productId]: {
                    ...prev[productId],
                    imagesSrc: updatedImages,
                }
            };
        });
    };



    // Handle input changes for form fields of a specific product
    const handleInputChange = (productId, field, value) => {
        setProductForms(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    // Handle category selection change for a specific product
    const handleCategoryChange = (productId, value) => {
        setCategoriesById(prev => ({
            ...prev,
            [productId]: value
        }));
    };

    // Handle form submission to update product
    const updateProduct = async (e, id) => {
        e.preventDefault();

        // Extract current form data for this product
        const form = productForms[id];
        const category = categoriesById[id];

        // Validate form data via passed-in validation function
        const isValid = requestValidation(form);
        if (!isValid) return;

        // Prepare updated product data including category
        const updatedProduct = {
            ...form,
            category,
            imagesSrc: form.imagesSrc || [],
        };

        // Send update request to server
        const status = await updateData(id, updatedProduct);

        if (status === "OK") {
            // Show success message modal on successful update
            dispatch(setModalMassgae("The update was successful."));
            dispatch(setOpenModal());
        }
    };

    // Handle deleting a product by ID and showing confirmation
    const deleteProduct = async (id, title) => {
        const status = await deleteData(id);
        if (status === "OK") {
            dispatch(setModalMassgae(`${title} has been deleted`));
            dispatch(setOpenModal());
        }
    };

    // Columns config for boughtBy TableComp display
    const columns = [
        { label: "Full Name", accessor: "fullName" },
        { label: "Quantity", accessor: "quantity" },
        { label: "Date", accessor: "date" }
    ];

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h5" style={{ marginBottom: '20px', marginTop: '20px' }}>
                    Products
                </Typography>

                {/* Loop over each product and create an editable form */}
                {products.map(item => (
                    <Box
                        key={item._id}
                        component="form"
                        onSubmit={(e) => updateProduct(e, item._id)}
                        sx={{
                            width: { xs: '100%', md: '80%' },
                            margin: '0 auto', marginTop: '30px',
                        }}
                    >
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
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Price"
                                            variant="outlined"
                                            value={productForms[item._id]?.price || ''}
                                            onChange={(e) => handleInputChange(item._id, 'price', e.target.value)}
                                        />
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="inStock"
                                            variant="outlined"
                                            value={productForms[item._id]?.inStock || 0}
                                            onChange={(e) => handleInputChange(item._id, 'inStock', e.target.value)}
                                        />
                                    </Box>
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
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        value={productForms[item._id]?.description || ''}
                                        required
                                        onChange={(e) => handleInputChange(item._id, 'description', e.target.value)}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    {(productForms[item._id]?.imagesSrc || []).map((img, index) => (
                                        <Box key={index} mb={1} display="flex" alignItems="center" gap={1}>
                                            <TextField
                                                fullWidth
                                                label={`Image URL ${index + 1}`}
                                                variant="outlined"
                                                value={img}
                                                onChange={(e) => handleImageChange(item._id, index, e.target.value)}
                                            />
                                            {(productForms[item._id]?.imagesSrc.length > 1) && (
                                                <Button onClick={() => removeImageField(item._id, index)} color="error">
                                                    Remove
                                                </Button>
                                            )}
                                        </Box>
                                    ))}

                                    <Button onClick={() => addImageField(item._id)} startIcon={<AddPhotoAlternateIcon />} sx={{ mt: 1 }}>
                                        Add Another Image
                                    </Button>

                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    {(productForms[item._id]?.imagesSrc || []).map((src, i) => (
                                        <Box
                                            component='img'
                                            key={i}
                                            src={src}
                                            alt={`Preview ${i}`}
                                            sx={{
                                                maxWidth: '300px',
                                                maxHeight: '300px',
                                                objectFit: 'contain',
                                                marginRight: '10px',
                                                width: { xs: '63px', sm: '140px', xl: '270px', },
                                                height: 'auto'
                                            }}
                                        />
                                    ))}

                                </Grid>

                                {/* Bought by table */}
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant='h5' style={{ textAlign: 'center', margin: '5px' }}>
                                        Bought by
                                    </Typography>
                                    <TableComp columns={columns} data={item.boughtBy} />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', gap: '12px', alignItems: 'end', justifyContent: 'flex-end' }}>
                                    <Button type="submit" name="save" variant="contained" sx={{ backgroundColor: '#212121' }} >
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => deleteProduct(item._id, item.title)}
                                        name="delete"
                                        variant="contained"
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Box>
                ))}

                {/* Add new product button */}
                <Box style={{ width: '80%', margin: '15px auto' }}>
                    <Button variant="contained" onClick={createProduct} style={{ marginTop: '30px' }}>
                        Add Product
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default UpdateProducts;
