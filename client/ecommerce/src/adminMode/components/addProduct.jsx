import { Box, Button, Collapse, Container, Grid, IconButton, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { setModalMassgae, setOpenModal } from "../../redux/modal/modalSlice";
import { useDispatch } from "react-redux";

const AddProduct = ({ categories, createProduct, addData, requestValidation }) => {

    const dispatch = useDispatch();

    const [showMoreImages, setShowMoreImages] = useState(false);
    const [productDetails, setProductDetails] = useState({
        title: '',
        price: '',
        inStock: '',
        description: '',
        category: '',
        imagesSrc: [''] // Start with one image field
    });

    const handleImageChange = (index, value) => {
        const updatedImages = [...productDetails.imagesSrc];
        updatedImages[index] = value;
        setProductDetails(prev => ({
            ...prev,
            imagesSrc: updatedImages
        }));
    };
    const removeImageField = (index) => {
        const updatedImages = [...productDetails.imagesSrc];
        updatedImages.splice(index, 1);
        setProductDetails(prev => ({
            ...prev,
            imagesSrc: updatedImages
        }));
    };


    const addImageField = () => {
        setProductDetails(prev => ({
            ...prev,
            imagesSrc: [...prev.imagesSrc, '']
        }));
    };


    const handleInputChange = (field, value) => {
        setProductDetails(prev => ({
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
                            {productDetails.imagesSrc.map((img, index) => (
                                <Box key={index} mb={1} display="flex" alignItems="center" gap={1}>
                                    <TextField
                                        fullWidth
                                        label={index === 0 ? 'Link to pic' : `Additional image ${index}`}
                                        variant='outlined'
                                        value={img}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        style={{ backgroundColor: 'whitesmoke' }}
                                    />

                                    {/* Show remove button only if more than one image */}
                                    {productDetails.imagesSrc.length > 1 && (
                                        <IconButton
                                            onClick={() => removeImageField(index)}
                                            aria-label="remove image"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}

                            <Box display="flex" alignItems="center" mt={1}>
                                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                                    Add another image
                                </Typography>
                                <IconButton
                                    onClick={addImageField}
                                    aria-label="add more imagesSrc"
                                >
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </Box>
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
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#212121' }}>Save</Button>
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

