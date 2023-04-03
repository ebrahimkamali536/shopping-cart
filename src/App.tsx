import ProductDetails from "./pages/ProductDetails";
import CartContextProvider from "./context/CartContextProvider";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import ProductsContextProvider from "./context/ProductsContextProvider";
const App = () => {
  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </CartContextProvider>
    </ProductsContextProvider>
  );
};

export default App;
