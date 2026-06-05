import { newProduct, Product } from "../interfaces/product.interface.js";

const products: Product[] = [
  {
    id: 1,
    name: "노트북",
    stock: 999,
    imageUrl: "https://picsum.photos/seed/laptop/160/160",
    price: 1350000,
  },
  {
    id: 2,
    name: "카메라",
    stock: 999,
    imageUrl: "https://picsum.photos/seed/camera/160/160",
    price: 890000,
  },
];

export function isAlreadyExist(id: number) {
  return products.some((product) => product.id === id);
}

export function save(product: newProduct) {
  const id = (products.at(-1)?.id ?? 0) + 1;

  const newProduct: Product = {
    id: id,
    ...product,
  };

  products.push(newProduct);
}

export function findAll() {
  return [...products];
}

export function findById(id: number) {
  return products.find((product) => product.id === id) ?? null;
}

export function findStockById(id: number) {
  const product = findById(id);
  if (product) {
    return product.stock;
  }
  return null;
}

export function deleteById(id: number) {
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);
}

export function reset() {
  products.length = 0;
}
