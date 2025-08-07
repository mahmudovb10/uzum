import Product from "./Product";

function Products({ products }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map((prod) => (
        <Product key={prod.id} prod={prod} />
      ))}
    </div>
  );
}

export default Products;
