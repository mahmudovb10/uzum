import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import { useNavigate, Link } from "react-router-dom";
import { formatPrice } from "../utils";

function Basket() {
  const navigate = useNavigate();
  const { products, totalAmount, totalPrice, dispatch } =
    useContext(GlobalContext);

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const increase = (id) => {
    dispatch({ type: "INCREASE_AMOUNT", payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: "DECREASE_AMOUNT", payload: id });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Basket</h1>
      <p className="font-bold">Total Amount: {totalAmount}</p>
      <p className="font-bold">Total Price: {formatPrice(totalPrice)}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product, index) => (
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
              <p>Price: ${product.price}</p>
              <p>Amount: {product.amount}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => decrease(product.id)} className="btn">
                  -
                </button>
                <span>{product.amount}</span>
                <button onClick={() => increase(product.id)} className="btn">
                  +
                </button>
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <Link to={`/singleProduct/${product.id}`}>
                  <button type="button" className="btn btn-outline btn-primary">
                    Buy
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="btn btn-neutral btn-outline mt-[5rem]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Basket;
