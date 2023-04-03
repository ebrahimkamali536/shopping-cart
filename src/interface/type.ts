export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: any ;
}

export interface ICart {
  products: IProduct[];
  totalPrice: number;
  totalCount: number;
  clear: boolean;
  checkout: boolean;
}
