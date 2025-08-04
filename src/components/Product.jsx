import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Product({ prod }) {
  const { dispatch, products } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();

    const item = products.find((product) => product.id == prod.id);

    if (item) {
      dispatch({ type: "INCREASE_AMOUNT", payload: prod.id });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: { ...prod, amount: 1 } });
    }
  };
  return (
    <Link to={`/singleProduct/${prod.id}`}>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={prod.thumbnail} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {prod.title}
            <div className="badge badge-secondary">New</div>
          </h2>
          <p className="line-clamp-2">{prod.description}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-outline btn-primary"
              onClick={handleSubmit}
            >
              Add to Card
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
