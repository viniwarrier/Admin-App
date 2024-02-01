import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import AddCategoryDialog from "./AddCategoryDialog";
import { useState } from "react";
import UpdateCategoryDialog from "./UpdateCategoryDialog";

interface NewCategory {
  name: string;
  image: string;
}
export default function AdminButtons() {
  const router = useRouter();
  const [isAddCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenUpdateCategoryDialog = () => {
  
    setDialogOpen(true);
  };

  const handleCloseUpdateCategoryDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenAddCategoryDialog = () => {
    setAddCategoryDialogOpen(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setAddCategoryDialogOpen(false);
  };

  const handleAddCategory = async (newCategory: NewCategory) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Category added successfully:", data);
        alert("Category added successfully");
      } else {
        console.error("Failed to add category. Status:", response.status);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddProductClick = () => {
    router.push("/AddProducts");
  };
  const handleEditClick = () => {
    alert("Please click a Product");
  };
 
  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        color="success"
        onClick={handleAddProductClick}
      >
        ADD PRODUCTS
      </Button>
      <Button variant="contained" color="success" onClick={handleEditClick}>
       EDIT/DELETE PRODUCT
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpenAddCategoryDialog}
      >
        ADD CATEGORY
      </Button>
      <AddCategoryDialog
        open={isAddCategoryDialogOpen}
        onClose={handleCloseAddCategoryDialog}
        onAddCategory={handleAddCategory}
      />
      <div>
       <Button variant="contained" color="success" onClick={handleOpenUpdateCategoryDialog}>
        EDIT/DELETE CATEGORY
      </Button>      
        <UpdateCategoryDialog  open={isDialogOpen}   onClose={handleCloseUpdateCategoryDialog}    
         />
      
      </div>
    </Stack>
  );
}
