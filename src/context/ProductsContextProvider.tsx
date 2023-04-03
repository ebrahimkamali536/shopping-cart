import axios from "axios";
import React, { createContext, useState, useEffect, ReactNode, ReactElement } from "react";

export const ProductsContext = createContext<any>(null);

interface IProps {
  children: ReactNode;
}
const ProductsContextProvider = ({ children }:IProps) => {
  const [state, setState] = useState({
    products: [],
    loading: false,
    error: "",
  });
  useEffect(() => {
    const fetchProducts = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { data } = await axios.get("https://fakestoreapi.com/products/");
      setState((prevState) => ({
        ...prevState,
        loading: false,
        products: data,
      }));
    };
    fetchProducts();
  }, []);
  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
