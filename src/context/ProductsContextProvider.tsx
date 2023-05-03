import axios from "axios";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ProductsContextType } from "./type";


export const ProductsContext = createContext<ProductsContextType | null>(null);

interface IProps {
  children: ReactNode;
}

const ProductsContextProvider = ({ children }: IProps) => {
  const [state, setState] = useState<ProductsContextType>({
    products: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL_API}/products/`
      );
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
