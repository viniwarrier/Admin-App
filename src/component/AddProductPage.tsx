import * as React from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Container } from '@mui/system';
import  { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
interface Category {
  id: number;
  name: string;
  image: string;
}
interface FormData {
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
const AddProductPage = () => {
    const router=useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<FormData>({
      title: '',
      price: 0,
      description: '',
      category: {
        id: 1,
        name: 'Clothes',
        image: 'https://api.lorem.space/image/fashion?w=640&h=480&r=4278',
      },
      images: ['https://placeimg.com/640/480/any'],
    });
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleHomeClick=()=>{  
         router.push('/Products') ;
      }
      useEffect(() => {      
        const fetchCategories = async () => {
          try {
            const response = await fetch('https://api.escuelajs.co/api/v1/categories');
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Category[] = await response.json();       

           setCategories(data);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []);
    
      const handleCategoryChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
        const selectedCategoryId = event.target.value as number;      
        const selectedCategory: Category | undefined = categories.find((category) => category.id === selectedCategoryId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          category: selectedCategory || { id: 0, name: '', image: '' },
        }));
      };

    const handleAddProduct = async () => {
        try {
            console.log('Request Payload:', JSON.stringify(formData));
            const categoryId = formData.category.id;
            const updatedFormData = {
                ...formData,
                categoryId: categoryId, 
                category: undefined, 
              };         
          const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormData),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error creating product:', errorData);       
            return;
          }    
          const data = await response.json();
          console.log('Product created successfully:', data); 
          alert("Product added Successfully");
        } catch (error) {
          console.error('Error creating product:', error);          
        }
      };
  return (
    <Container
    maxWidth="md"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#81C784',
    }}
  >
       <Typography variant="h4">ADMIN CONSOLE</Typography>
      <Typography variant="h5">Add Product</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
        style={{ width: '100%', alignContent:'center' }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            // name="category"
            value={formData.category.id}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>         
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Button  type="submit" variant="contained" color="success">
              Add Product
            </Button>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Button  variant="contained" color="success" onClick={handleHomeClick}>
              Home
            </Button>
          </Grid>             
        </Grid>
      </form>
    </Container>
  );
}
export default AddProductPage