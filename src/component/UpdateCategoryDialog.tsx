import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
} from '@mui/material';
interface Category {
    id: number;
    name: string;
    image: string;
  }
  interface UpdateCategoryDialogProps {
    open: boolean;
    onClose: () => void;   
  }
const UpdateCategoryDialog:React.FC<UpdateCategoryDialogProps>= ({open,onClose}) => {  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryId,setCategoryId]=useState('');
  let idn: number;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://api.escuelajs.co/api/v1/categories'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategoryId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
 
  const handleDeleteClick = async (id:number) => {
  
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (shouldDelete) {
     console.log("id",id);
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const deletedResponse = await response.json();
        console.log("Delete response:", deletedResponse);
       
        if (response.ok) {
          alert("Deleted Successfully");
          return;
      
        } else {
          alert("Couldn't Delete Category!!");
          return;
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleCategoryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedCategoryId(event.target.value);
  };
   
  const handleUpdateCategory = async () => {  
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${selectedCategoryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newCategoryName,
          }),
        }
      );
       setCategoryId(selectedCategoryId);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating category:', errorData);
        return;
      }
      console.log('Category updated successfully',response);
      setNewCategoryName('');
      setSelectedCategoryId('');
      alert('Category Updated');
    
    } catch (error) {
      console.error('Error updating category:', error);
    }  
  };

 
   const handleClearUpdate=()=>{
    setNewCategoryName('');
    setSelectedCategoryId('');
   }
  return (
    <div>     
      <Dialog open={open} onClose={onClose}>
        <DialogTitle style={{marginBottom:2}}>Update Category</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="category-label" style={{marginTop:6}}>Select Category</InputLabel>
            <Select style={{marginTop:5}}
              labelId="category-label"
              id="category"
             name="category"
              value={selectedCategoryId}
              onChange={(event) => {               
            handleCategoryChange(event);
          }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}-{idn=category.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="New Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateCategory}
            style={{ width: '100px', height: '30px', marginTop:'4px' }}
          >
            Update
          </Button>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" onClick={()=>handleDeleteClick(idn)} style={{ width: '100px', height: '30px' }}>DELETE</Button>
        <Button variant="contained" onClick={onClose}style={{ width: '100px', height: '30px' }}>CLOSE</Button>
        <Button variant="contained" onClick={handleClearUpdate}style={{ width: '100px', height: '30px' }}>CLEAR</Button>
      </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateCategoryDialog;
