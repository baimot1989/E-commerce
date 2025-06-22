import { Box, Button, Container, Grid, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { setModalMassgae, setOpenModal } from "../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";

const AddProduct = ({ categories, createProduct, addData, requestValidation }) => {

    const dispatch = useDispatch();

    const [productDetails, setProductDetiels] = useState({
        title: '',
        price: '',
        inStock: '',
        imageSrc: '',
        description: '',
        category: ''
    });

    const handleInputChange = (field, value) => {
        setProductDetiels(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addProduct = async (e) => {
        e.preventDefault();

        const isValid = requestValidation(productDetails);
        if (!isValid) return; // stop if validation failed

        const status = await addData(productDetails);

        if (status == 'OK') {

            dispatch(setModalMassgae(`The product was created successfully`));
            dispatch(setOpenModal());
            createProduct()
        }
    }



    return (
        <Container>
            <form onSubmit={(e) => addProduct(e)} style={{ width: '80%', margin: '0 auto', marginTop: '34px' }}>


                <Paper style={{ padding: '15px', backgroundColor: '#e3e6f0' }}>
                    <Typography variant="h6" gutterBottom>
                        Adding a product:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }} >

                            <TextField style={{ backgroundColor: 'whitesmoke' }}
                                fullWidth
                                label='Titel'
                                variant='outlined'
                                value={productDetails?.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField style={{ backgroundColor: 'whitesmoke' }}
                                    fullWidth
                                    type="number"
                                    label='Price'
                                    variant='outlined'
                                    value={productDetails?.price || ''}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                />
                                <TextField style={{ backgroundColor: 'whitesmoke' }}
                                    fullWidth
                                    type="number"
                                    label='InStock'
                                    variant='outlined'
                                    value={productDetails?.inStock || ''}
                                    onChange={(e) => handleInputChange('inStock', e.target.value)}
                                />
                            </Box>

                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Select
                                fullWidth
                                displayEmpty                   // ← make empty value render
                                value={productDetails?.category}
                                onChange={e => handleInputChange('category', e.target.value)}
                                renderValue={selected =>
                                    selected === "" ? "Select Category" : selected
                                }                              // ← custom placeholder text
                            >
                                <MenuItem disabled value="">
                                    Select Category
                                </MenuItem>
                                {categories.map(c => (
                                    <MenuItem key={c._id} value={c.categoryName}>
                                        {c.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField style={{ backgroundColor: 'whitesmoke' }}
                                fullWidth
                                label='Link to pic'
                                variant='outlined'
                                value={productDetails?.imageSrc || ''}
                                onChange={(e) => handleInputChange('imageSrc', e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField style={{ backgroundColor: 'whitesmoke' }}
                                fullWidth
                                label='Description'
                                variant='outlined'
                                multiline
                                rows={4}
                                value={productDetails?.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Button type="submit" variant="contained">Save</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
            <div style={{ width: '80%', margin: '15px auto' }}>
                <Button variant="contained" color="error" onClick={createProduct}> cancel</Button>
            </div>

        </Container>
    );
}

export default AddProduct;

