import { useContext } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

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
        sx={{ padding: "12px" }}
        component="img"
        height="194"
        image={product.image}
        alt="Paella dish"
      />

      <CardContent>
        <Link to={`/product/${product.id}`}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            fontWeight="medium"
          >
            {titleShortener(product.title)}
          </Typography>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
        {quantityCount(cart, product.id) === 1 ? (
          <button
            onClick={() => dispatch({ type: "REMOVE", payload: product })}
          >
            remove
          </button>
        ) : (
          quantityCount(cart, product.id) > 1 && (
            <button
              onClick={() => dispatch({ type: "DECREASE", payload: product })}
            >
              mines
            </button>
          )
        )}

        {isInCart(cart, product.id) ? (
          <button
            onClick={() => dispatch({ type: "INCREASE", payload: product })}
          >
            +
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
          >
            add to cart
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
