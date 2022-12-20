import faker from "faker";
faker.locale = "es";

const listMockProducts = (req, res) => {
  const CANT_PRODS = 5;
  const productos = [];
  for (let i = 1; i <= CANT_PRODS; i++) {
    const prod = {
      id: i,
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: `${faker.image.imageUrl()}?${i}`,
    };
    productos.push(prod);
  }
  res.json(productos);
};

export { listMockProducts };
