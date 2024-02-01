// pages/product/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import ProductDetail from "@/component/ProductDetail/ProductDetail";
import { Box } from "@mui/system";
const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box sx={{ bgcolor: "F8BBD0", height: "100vh" }}>
      <ProductDetail productId={id} />
    </Box>
  );
};
export default ProductDetailPage;
