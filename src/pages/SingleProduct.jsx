import { useParams, useNavigate } from "react-router-dom";
import { usefetch } from "../hooks/useFetch";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import Basket from "./Basket";
import { Link, NavLink } from "react-router-dom";

function SingleProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dispatch } = useContext(GlobalContext);

  const {
    data: product,
    error,
    isPending,
  } = usefetch("https://dummyjson.com/products/" + id);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_BASKET", payload: product });
  };

  if (isPending || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-xl p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-3 text-sm mb-4">
                <span className="badge badge-outline">
                  Brand: {product.brand}
                </span>
                <span className="badge badge-outline">
                  Category: {product.category}
                </span>
                <span className="badge badge-success">
                  Rating: {product.rating} ⭐
                </span>
                <span className="badge badge-info">{product.stock} left</span>
              </div>
              <p className="text-3xl font-bold text-primary mb-6">
                ${product.price}
              </p>
            </div>

            <div className="flex gap-4">
              <button className="btn btn-outline" onClick={() => navigate(-1)}>
                Go Back
              </button>
              <button
                className="btn btn-primary flex-1 "
                onClick={addToCart}
                id="buyBtnn"
              >
                Add to Card
              </button>
              <Link to="/basket">
                <button className="btn btn-primary">Buy</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
