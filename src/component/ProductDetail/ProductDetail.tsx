// components/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
interface ProductDetailProps {
  productId: string | string[] | undefined;
}
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}
const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedPrice, setEditedPrice] = useState<number | "">("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const router = useRouter();
  const handleEditClick = async (prodId: number) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${prodId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editedTitle,
            price: editedPrice,
            description: editedDescription,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedProduct = await response.json();
      console.log("Updated product:", updatedProduct);
      if (response.ok) {
        alert("Product Updated Successfully");
      } else {
        alert("Product Update Failed!!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const handleDeleteClick = async (productId: number) => {
    if (!productId) {
      alert("Please choose product");
      return;
    }
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (shouldDelete) {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${productId}`,
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
          alert("Couldn't Delete Product!!");
          return;
        } 
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API response:", data);
        setProduct(data);
        setEditedTitle(data.title);
        setEditedPrice(data.price);
        setEditedDescription(data.description);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (productId) {
      fetchData();
    }
  }, [productId]);
  const handleHomeClick = () => {
    router.push("/Products");
  };
 
  return (
    <Box sx={{ bgcolor: "F8BBD0", height: "100vh" }}>
      {product ? (
        <Grid container>
          <Grid item xs={12} sm={6} md={2} lg={3}>
            <Card>
              <CardContent>
                <img
                  src={product?.category.image}
                  alt={product?.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(Number(e.target.value))}
                  style={{ marginBottom: "10px" }}
                />
                <label>Description:</label>
                <TextareaAutosize
                 
                  aria-label="Description"
                  minRows={3}
                  placeholder="Description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  style={{ width: "100%", marginTop: "10px" }}
                />
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "margin-Left",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleEditClick(product.id)}
                >
                  UPDATE ITEM
                </Button>{" "}
                &nbsp;
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  DELETE
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleHomeClick}
                >
                  HOME
                </Button>        
               
              
              </Box>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <p>Loading</p>
      )}
    </Box>
  );
};
export default ProductDetail;
