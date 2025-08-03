import Product from "./Product";

function Products({ products }) {
  return (
    <>
      {products.map((prod) => {
        return <Product key={prod.id} prod={prod} />;
      })}
    </>
  );
}

export default Products;
