import { Box, Button, IconButton, Typography } from "@mui/material";
import { useFetchProduct } from "../hook/useFetchProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, Share } from "@mui/icons-material";
import { pathnameToId } from "../utils/function";
const ProductDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { state } = useFetchProduct(`/${pathnameToId(pathname)}`);

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
          src={state.product.image}
          style={{
            width: "50%",
          }}
        />
      </Box>
      <Box>
        <Typography>{state.product.title}</Typography>
        <Typography>{state.product.price} $</Typography>
      </Box>
      <Box></Box>
      <Box>
        <Typography>More Details</Typography>
        <Typography>{state.product.description}</Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
