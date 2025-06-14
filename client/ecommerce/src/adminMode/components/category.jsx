import { useState } from "react";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";

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
    <Box sx={{ width: "70%", margin: "0 auto 10px" }}>
      <Grid container spacing={2} alignItems="center" justifyContent={"space-between"}>
        <Grid item sm={12} md={6}>
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

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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
    </Box>
  );
};

export default Category;
