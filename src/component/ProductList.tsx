// ProductList.tsx

import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
} from "@mui/material";
import Admin from "@/pages/Admin";
import { AppBar, Toolbar, CssBaseline, Button, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
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
function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage: number = 10;
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [titleQuery, setTitleQuery] = useState<string>("");
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleQuery(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {       
        setTotalProducts(data.length);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const offset = (page - 1) * itemsPerPage;      
      setCurrentPage(page); //PAGINATION IS APPLIED HERE
      let url = `https://api.escuelajs.co/api/v1/products/`;
      if (titleQuery) {
        url += `?title=${titleQuery}`;
      } else {
        url += `?offset=${offset}&limit=${itemsPerPage}`;
      }
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
       

        if (data.length === 0) {
          console.log("No products found for the specified title.");
        }
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
    setLoggedIn(true);
  }, [page, itemsPerPage, titleQuery, currentPage]);  
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">ADMIN MANAGEMENT</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "F8BBD0", height: "100vh" }}>
        <div>
          <InputLabel
            htmlFor="title"
            style={{
              width: "250px", 
              height: "20px", 
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            Search Product Title:
          </InputLabel>
          <input
            aria-label="title"
            type="text"
            id="title"
            value={titleQuery}
            onChange={handleTitleChange}
            style={{
              width: "300px", 
              height: "30px", 
              marginLeft: "20px",
            }}
          ></input>
        </div>
        <div style={{ display: "flex" }}>
          <Admin />
          <div style={{ padding: "20px", backgroundColor: "#FFEBEE" }}>
            <h2>WELCOME TO PLATZI E-STORE</h2>
            {Number.isInteger(totalProducts) &&
              Number.isInteger(itemsPerPage) && (
                <Pagination
                  count={Math.ceil(totalProducts / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                />
              )}
            <Grid container spacing={3}>
              {products ? (
                products.map((product, index) => (
                  <Grid item key={product.id} xs={12} sm={6} md={2} lg={3}>    
                   <Link  href={`/product/${product.id}`} key={product.id}>                                 
                    <Card>
                      <CardContent> 
                        <img
                          src={product.category.image}
                          alt={product.title}
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                        <Typography variant="h6" component="div">
                       
                          {product.title}  
                        </Typography>
                        <Typography variant="body1" component="div">
                          Price: ₹ {product.price}
                        </Typography>
                        <Typography color="textSecondary">
                          {product.description.substring(0, 100)}
                        </Typography>
                        <Typography color="textSecondary">
                          Item {index + 1} of {products.length}
                        </Typography>                      
                      </CardContent>
                    </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </Grid>
          </div>
        </div>
        <Typography variant="body2" color="textSecondary">
          Showing{" "}
          {Math.min((currentPage - 1) * itemsPerPage + 1, totalProducts)} -
          {Math.min(currentPage * itemsPerPage, totalProducts)} of{" "}
          {totalProducts} products
        </Typography>
      </Box>
    </>
  );
}
export default ProductList;
