import { ICart } from "../interface/type";

export const titleShortener = (title: string) => {
  const titleSplit = title
    .replace(/[^a-zA-Z0-9]/g, " ")
    .split(" ")
    .filter((word) => word);

  return `${titleSplit[0]} ${titleSplit[1]}`;
};

export const isInCart = (cart: ICart, productId: number) => {
  const foundProduct = !!cart.products.find(
    (product) => product.id === productId
  );
  return foundProduct;
};

export const quantityCount = (cart: ICart, productId: number) => {
  const foundProductIndex = cart.products.findIndex(
    (product) => product.id === productId
  );
  if (foundProductIndex === -1) {
    return false;
  } else {
    return cart.products[foundProductIndex].quantity;
  }
};

export const totalProductCount = (cart: ICart) => {
  const sumQuantity = cart.products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  return sumQuantity;
};

export const totalPriceCount = (cart: ICart) => {
  const sumPrice = cart.products.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.quantity * currentValue.price,
    0
  );
  return sumPrice;
};

export const pathnameToId = (pathname: string) => {
  const getId = pathname
    .split("/")
    .filter((path) => path !== "product" && path)
    .join("");
  return getId;
};
