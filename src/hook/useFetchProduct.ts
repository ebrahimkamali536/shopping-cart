import { useState, useEffect } from "react";
import { IProduct } from "../interface/type";
import axios from "axios";

interface IState {
  loading: boolean;
  product: IProduct | {}
  error: null | string;
}

export const useFetchProduct = (id:string) => {
  const [state, setState] = useState<IState>({
    loading: false,
    product: {},
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));

      const { data } = await axios(`${process.env.BASE_URL_API}/products/${id}`);

      setState((prevState) => ({
        ...prevState,
        product: data,
        loading: false,
      }));
    };

    fetchData();
  }, []);

  return { state };
};
