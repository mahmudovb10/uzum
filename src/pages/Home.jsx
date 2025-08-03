import { useEffect, useState } from "react";

import Product from "../components/Product";
import { usefetch } from "../hooks/useFetch";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  const { data, isPending, error } = usefetch("https://dummyjson.com/products");

  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
    }
  }, [data]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      {isPending && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <Product key={prod.id} prod={prod} />
        ))}
      </div>
    </div>
  );
}

export default Home;
