import { useState, useEffect } from "react";
import { useFetchData } from "../../hooks/fetchData";
import Category from "../components/category";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { justifyContent, width } from "@mui/system";
import { useFieldCheck } from "../../hooks/useFieldCheck";

const API_URL = import.meta.env.VITE_API_URL;

const Categories = () => {

  const { addData, updateData, deleteData, data } = useFetchData(`${API_URL}/categories`);
  const { fieldCheck } = useFieldCheck();
  const [categoryName, setCategoryName] = useState('');


  const addCategory = () => {  // function for adding categories

    const isValid = fieldCheck({ categoryName: categoryName });

    if (!isValid) {
      addData({ categoryName })
      setCategoryName('')
    }
  }

  return (
    <>
      <Container>
        <Typography variant="h5" style={{ marginTop: '15px' }}>Categories</Typography>
        <Box sx={{ width: { xs: '300px', sm: '600px', md: '800px' }, margin: '0 auto', marginTop: '30px', textAlign: 'center' }}>
          <Box sx={{ width: '73%', margin: '0 auto' }} >
            {data && data.map(item => (
              <Category key={item._id} item={item} updateData={updateData} deleteData={deleteData} />
            ))}
          </Box>
          <Box style={{ display: 'flex', gap: '1rem', margin: ' 10px auto', justifyContent: 'space-between', width: '73%' }}>
            <TextField
              fullWidth
              required
              label="category"
              variant="outlined"
              placeholder="Add new category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button sx={{ width: '50%' }} variant="contained" color="primary" onClick={addCategory}>Add</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Categories;