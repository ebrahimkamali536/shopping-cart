import { ReactNode, createContext, useEffect, useReducer } from "react";
import {IProduct } from "../interface/type";

interface IProps {
  children: ReactNode;
}


interface IInitialState {
  products: IProduct[] | [];
  totalCount: number;
  totalPrice: number;
  clear: boolean;
  checkout: boolean;
}

interface IInitialAction {
  type: "ADD_TO_CART" | "INCREASE" | "DECREASE" | "REMOVE";
  payload: IProduct;
}

const initialState: IInitialState = {
  products: [],
  totalPrice: 0,
  totalCount: 0,
  clear: false,
  checkout: false,
};

export const CartContext = createContext<{
  cart: IInitialState;
  dispatch: React.Dispatch<IInitialAction>;
}>({
  cart: initialState,
  dispatch: () => {},
});

const CartContextProvider = ({ children }: IProps) => {
  const savedData = localStorage.getItem("cart");
  const parsedData = savedData ? JSON.parse(savedData) : null;

  const reducer = (state: IInitialState, action: IInitialAction) => {
    const { type, payload } = action;
    switch (type) {
      case "ADD_TO_CART":
        if (!!state.products.find((product) => product.id === payload.id)) {
          return {
            ...state,
            products: [...state.products],
          };
        } else {
          return {
            ...state,
            products: [...state.products, { ...payload, quantity: 1 }],
          };
        }
      case "INCREASE":
        const iIndex = state.products.findIndex(
          (product) => product.id === payload.id
        );

        state.products[iIndex].quantity++;

        return { ...state };
      case "DECREASE":
        const dIndex = state.products.findIndex(
          (product) => product.id === payload.id
        );

        state.products[dIndex].quantity--;
        return { ...state };

      case "REMOVE":
        const newProducts = state.products.filter(
          (product) => product.id !== payload.id
        );
        return {
          ...state,
          products: newProducts,
        };
      default:
        return state;
    }
  };

  const [cart, dispatch] = useReducer(reducer, parsedData || initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
