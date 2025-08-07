import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link, NavLink } from "react-router-dom";

function LikedProducts() {
  const { likedProducts, dispatch } = useGlobalContext();

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_LIKED_PRODUCT", payload: id });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {likedProducts.map((product, index) => (
        <div key={index} className="card w-full bg-base-100 shadow">
          <figure>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-contain"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-outline btn-error"
                onClick={() => handleDelete(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LikedProducts;
