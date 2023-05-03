import { IProduct } from "../interface/type";

export interface ProductsContextType {
    products: IProduct[] | [],
    loading: boolean,
    error: string
  }