// // components/FilterBar.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Slider,
//   TextField,
//   Button,
//   Typography,
//   useMediaQuery,
// } from '@mui/material';

// const FilterBar = ({ categories = [], maxPrice, onFilterChange }) => {

//   const isMobile = useMediaQuery('(max-width:600px)');

//   const [category, setCategory] = useState('All');
//   const [price, setPrice] = useState(maxPrice);
//   const [title, setTitle] = useState('');

//   useEffect(() => {
//     setPrice(maxPrice); // Update when maxPrice is loaded
//   }, [maxPrice]);

//   // Notify parent when filters change
//   useEffect(() => {
//     onFilterChange({ category, price, title });
//     console.log('randring')
//   }, [category, price, title, onFilterChange]);



//   const handleClear = () => {
//     setCategory('All');
//     setPrice(maxPrice);
//     setTitle('');
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: 2,
//         p: 2,
//         paddingBottom: 0,
//         borderRadius: 2,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         margin: '0 auto',
//         width: {xl:' 70%', md: '90%', sm: "90%"}
//       }}
//     >
//       {/* Category */}
//       <FormControl sx={{ minWidth: 150, flexGrow: 1 }} size="small">
//         <InputLabel>Category</InputLabel>
//         <Select
//           value={category}
//           label="Category"
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <MenuItem value="All">All</MenuItem>
//           {categories.map((cat, index) => (
//             <MenuItem key={index} value={cat.categoryName}>
//               {cat.categoryName}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Price Slider */}
//       <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 200 }}>
//         <Typography sx={{ mr: 1 }}>Price:</Typography>
//         <Slider
//           value={price}
//           onChange={(e, val) => setPrice(val)}
//           min={0}
//           max={maxPrice}
//           size="small"
//           sx={{ flex: 1, mx: 1 }}
//         />
//         <Typography>${price}</Typography>
//       </Box>

//       {/* Title Input */}
//       <Box sx={{ flexGrow: 1 }}>
//         <TextField
//           fullWidth
//           label="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           size="small"
//           sx={{ minWidth: isMobile ? '100%' : 150 }}
//         />
//       </Box>

//       {/* Clear Button */}
//       <Button variant="outlined" color="primary" onClick={handleClear}>
//         Clear
//       </Button>
//     </Box>
//   );
// };

// export default FilterBar;


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
  IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterBar = ({ categories = [], maxPrice, onFilterChange }) => {
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState(maxPrice);
  const [title, setTitle] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setPrice(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    onFilterChange({ category, price, title });
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
        pb:1,
        width: '85%',
        margin: '0 auto',
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* Search and icon container - always inline */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          gap: 1,
          minWidth: { xs: '200px', sm: '250px' },
        }}
      >
        <TextField
          label="Search by Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
          sx={{ width: '100%' }}
        />
        <IconButton
          onClick={() => setShowFilters((prev) => !prev)}
          color="primary"
          size="large"
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Expandable filters - shown inline after search+icon */}
      {showFilters && (
        <>
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
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 200, flex: 1 }}>
            <Typography sx={{ mr: 1 }}>Price:</Typography>
            <Slider
              value={price}
              onChange={(e, val) => setPrice(val)}
              min={0}
              max={maxPrice}
              size="small"
              sx={{ mx: 1, flex: 1 }}
            />
            <Typography>${price}</Typography>
          </Box>

          {/* Clear Button */}
          <Button variant="outlined" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </>
      )}
    </Box>
  );
};

export default FilterBar;

