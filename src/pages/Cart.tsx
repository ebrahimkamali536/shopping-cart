import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import {
  quantityCount,
  titleShortener,
  totalPriceCount,
} from "../utils/function";
import { Add } from "@mui/icons-material";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  return (
    <>
      <Header />
      {cart.products.length ? (
        <>
          <Grid
            container
            mt={4}
            sx={{ width: "80%", margin: "40px auto", boxShadow: 1 }}
          >
            {cart.products.map((product) => (
              <Grid item xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                    gap: "20px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={product.image}
                    alt="Live from space album cover"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography
                        component="div"
                        variant="h5"
                        fontWeight="bold"
                      >
                        {titleShortener(product.title)}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        Qty: {product.quantity}
                      </Typography>
                      <Typography
                        fontWeight="medium"
                        component="span"
                        variant="subtitle1"
                      >
                        {product.price} $
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box>
                    {quantityCount(cart, product.id) === 1 ? (
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: product })
                        }
                      >
                        remove
                      </button>
                    ) : (
                      quantityCount(cart, product.id) > 1 && (
                        <button
                          onClick={() =>
                            dispatch({ type: "DECREASE", payload: product })
                          }
                        >
                          mines
                        </button>
                      )
                    )}
                  </Box>
                  <IconButton
                    onClick={() =>
                      dispatch({ type: "INCREASE", payload: product })
                    }
                  >
                    <Add />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              borderTop: "1px solid",
              padding: "20px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: '40px'
            }}
          >
            <Typography>Total:</Typography>
            <Typography>{totalPriceCount(cart)} $</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",

            }}
          >
            <Button variant="contained" sx={{ margin: "0 auto" }}>
              Checkout
            </Button>
          </Box>
        </>
      ) : (
        <Typography>Cart is empty</Typography>
      )}
    </>
  );
};

export default Cart;
