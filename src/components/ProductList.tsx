import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContextProvider";

const ProductList = () => {
  const data = useContext(ProductsContext)

  if(data?.loading) return null

  return (
    <Grid mt={8} mb={8} container spacing={2} padding={2}>
      {data?.products?.map((product) => (
        <Grid item key={product.id} xs={6}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
