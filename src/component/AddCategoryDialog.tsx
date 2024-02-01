import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (newCategory: { name: string; image: string }) => void;
}
const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  open,
  onClose,
  onAddCategory,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const handleAddCategory = () => {
    const newCategory = {
      name: categoryName,
      image: categoryImage,
    };
    onAddCategory(newCategory);
    onClose();
  };
  const handleClear=()=>
  {
    setCategoryName('');
    setCategoryImage('');
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Category Image URL"
          value={categoryImage}
          placeholder="Enter URL"
          onChange={(e) => setCategoryImage(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
      <Button variant="contained" onClick={handleAddCategory} color="primary" style={{ width: '100px', height: '30px' }}>
          ADD
        </Button>
        <Button variant="contained" onClick={onClose} style={{ width: '100px', height: '30px' }}>CANCEL</Button>        
        <Button variant="contained" onClick={handleClear} color="primary" style={{ width: '100px', height: '30px' }}>
          CLEAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddCategoryDialog;
