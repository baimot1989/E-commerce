// components/FilterBar.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';

const FilterBar = ({ categories = [], maxPrice , onFilterChange }) => {
    
  const isMobile = useMediaQuery('(max-width:600px)');

  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState(maxPrice);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setPrice(maxPrice); // Update when maxPrice is loaded
  }, [maxPrice]);

  // Notify parent when filters change
  useEffect(() => {
    onFilterChange({ category, price, title });
    console.log('randring')
  }, [category, price, title, onFilterChange]);

  

  const handleClear = () => {
    setCategory('All');
    setPrice(maxPrice);
    setTitle('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Category */}
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat.categoryName}>
              {cat.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Slider */}
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 200 }}>
        <Typography sx={{ mr: 1 }}>Price:</Typography>
        <Slider
          value={price}
          onChange={(e, val) => setPrice(val)}
          min={0}
          max={maxPrice}
          size="small"
          sx={{ flex: 1, mx: 1 }}
        />
        <Typography>${price}</Typography>
      </Box>

      {/* Title Input */}
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="small"
        sx={{ minWidth: isMobile ? '100%' : 150 }}
      />

      {/* Clear Button */}
      <Button variant="outlined" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Box>
  );
};

export default FilterBar;
