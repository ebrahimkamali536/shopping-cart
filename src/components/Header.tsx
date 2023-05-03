import { useState, SyntheticEvent, useContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { Home, Favorite } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContextProvider";
import { totalProductCount } from "../utils/function";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(CartContext);
  const routes = [
    { path: "/", name: "Home", icon: <Home style={{ fontSize: "28px" }} /> },
    {
      path: "/favorite",
      name: "favorite",
      icon: <Favorite style={{ fontSize: "28px" }} />,
    },
    {
      path: "/cart",
      name: "cart",
      icon: (
        <Badge badgeContent={totalProductCount(cart)} color="primary">
          <ShoppingCartIcon style={{ fontSize: "28px" }} />
        </Badge>
      ),
    },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate()
  const [value, setValue] = useState(pathname);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ boxShadow: 2, padding: "10px 0" }}>
        <Typography variant="h4" fontWeight="bold" align="center">
          SHOPPERS
        </Typography>
      </Box>
      <BottomNavigation
        sx={{
          width: "100%",
          borderTop: "1px solid #D2CFCF",
          position: "fixed",
          bottom: "0px",
          left: "0px",
          zIndex: "999",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        value={value}
        onChange={handleChange}
      >
        {routes.map((route, index) => (
          <BottomNavigationAction
          key={index}
          onClick={() => navigate(route.path)}
            label={route.name}
            icon={route.icon}
            style={{
              color: pathname === route.path ? "#1976d2" : "",
            }}
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default Header;
