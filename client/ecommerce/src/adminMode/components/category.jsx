import { useState } from "react";
import { Button, Grid, TextField, Typography, Box, Container } from "@mui/material";

const Category = ({ item, updateData, deleteData }) => {
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (item) => {
    setEditId(item._id);
    setEditValue(item.categoryName);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      updateData(editId, { categoryName: editValue });
      setEditId(null);
      setEditValue("");
    }
  };

  return (
      <Grid container spacing={2} alignItems="center" justifyContent={'center'} sx={{my: 2}}>
        <Grid size={{ xs: 12, sm: 6}}>
          {editId === item._id ? (
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          ) : (
            <Typography variant="h5" sx={{ ml: 1 }}>
              {item.categoryName}
            </Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6}}>
          <Box sx={{ display: "flex", justifyContent: 'center', gap: 2 }}>
            {editId === item._id ? (
              <>
                <Button variant="contained" color="primary" onClick={saveEdit}>
                  Save
                </Button>
                <Button variant="contained" color="error" onClick={cancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => startEditing(item)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteData(item._id)}
                >
                  Remove
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
  );
};

export default Category;
