import { Box, Button, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../interface/type";
interface IState {
  product: IProduct | null,
  loading: boolean, 
  error: string
}
const ProductDetails = () => {
  const [state, setState] = useState<IState>({
    product: null,
    loading: false,
    error: "",
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const productId = pathname.replace("/product", "");

  useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { data: product } = await axios.get(
        `${import.meta.env.VITE_BASE_URL_API}/products${productId}`
      );
      setState((prevState) => ({ ...prevState, loading: false, product }));
    };
    fetchData();
  }, []);

  return (
    <Box>
      {/* back and share button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            style={{ color: "white" }}
            aria-label="upload picture"
            component="label"
          >
            <ArrowBack />
          </IconButton>
        </Button>
        <Button
          variant="contained"
          component="label"
          sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
        >
          <IconButton
            style={{ color: "white" }}
            aria-label="upload picture"
            component="label"
          >
            <Share />
          </IconButton>
        </Button>
      </Box>
      {/* image box */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <img
          src={state?.product?.image}
          style={{
            width: "50%",
          }}
        />
      </Box>
      <Box>
        <Typography>{state?.product?.title}</Typography>
        <Typography>{state?.product?.price} $</Typography>
      </Box>
      <Box></Box>
      <Box>
        <Typography>More Details</Typography>
        <Typography>{state?.product?.description}</Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
