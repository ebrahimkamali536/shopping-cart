import { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { isInCart, quantityCount, titleShortener } from "../utils/function";

import { CartContext } from "../context/CartContextProvider";

import { IProduct } from "../interface/type";
import { Link } from "react-router-dom";
interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  const { dispatch, cart } = useContext(CartContext);

  return (
    <Card sx={{ borderRadius: "12px" }}>
      <CardMedia
        sx={{ padding: "10px" }}
        component="img"
        height="194"
        image={product.image}
        alt="Paella dish"
      />
      <CardContent>
        <Link style={{textDecoration: "none", color: "#020202"}} to={`/product/${product.id}`}>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            fontWeight="medium"
            textAlign="center"
          >
            {titleShortener(product.title)}
          </Typography>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: '8px'
          }}
        >
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="bold"
          >
            {product.price} $
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0 10px" }}>
          {quantityCount(cart, product.id) === 1 ? (
            <Button
              variant="contained"
              color="error"
              sx={{ flex: "1" }}
              onClick={() => dispatch({ type: "REMOVE", payload: product })}
            >
              <DeleteIcon />
              Remove
            </Button>
          ) : (
            quantityCount(cart, product.id) > 1 && (
              <Button
                variant="contained"
                color="warning"
                sx={{ flex: "1" }}
                onClick={() => dispatch({ type: "DECREASE", payload: product })}
              >
                <RemoveIcon />
                Minus
              </Button>
            )
          )}

          {isInCart(cart, product.id) ? (
            <Button
              variant="contained"
              color="success"
              sx={{ flex: "1" }}
              onClick={() => dispatch({ type: "INCREASE", payload: product })}
            >
              <AddIcon />
              Plus
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "100%", flex: "1" }}
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              <AddShoppingCartIcon />
              add to cart
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
