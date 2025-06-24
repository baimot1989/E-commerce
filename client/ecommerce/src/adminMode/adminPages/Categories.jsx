import { useState, useEffect } from "react";
import { useFetchData } from "../../hooks/fetchData";
import Category from "../components/category";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { justifyContent, width } from "@mui/system";

const Categories = () => {

  const { addData, updateData, deleteData, data } = useFetchData('http://localhost:3000/categories');
  const [categoryName, setCategoryName] = useState('');

  const addCategory = () => {  // function for adding categories

    if (categoryName.trim() !== '') {
      addData({ categoryName })
      setCategoryName('')
    }
  }

  return (
    <>
      <Container>
        <div>
          <Typography variant="h5" style={{ marginTop: '15px' }}>Categories</Typography>
          <div style={{ width: '80%', margin: '0 auto', marginTop: '30px', textAlign: 'center' }}>
            {data && data.map(item => (
              <Category key={item._id} item={item} updateData={updateData} deleteData={deleteData} />
            ))}
            <Box style={{ display: 'flex', gap: '1rem', margin: ' 10px auto', justifyContent: 'space-between', width: '73%' }}>
              <TextField
                fullWidth
                label="category"
                variant="outlined"
                placeholder="Add new category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Button sx={{ width: '50%' }} variant="contained" color="primary" onClick={addCategory}>Add</Button>
            </Box>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Categories;