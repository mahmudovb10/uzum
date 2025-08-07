import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { FaHeart } from "react-icons/fa6"; // Oq yurak
import { FaRegHeart } from "react-icons/fa"; // Shaffof yurak
import { useState, useEffect } from "react";

function Product({ prod }) {
  const { dispatch, likedProducts, products } = useGlobalContext();

  const [liked, setLiked] = useState(false);

  // Mahsulot avval like qilinganmi – uni tekshirib, liked holatni boshlang‘ichga qo‘yamiz
  useEffect(() => {
    const isLiked = likedProducts.some((item) => item.id === prod.id);
    setLiked(isLiked);
  }, [likedProducts, prod.id]);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      // Mahsulot like bo‘lgan – uni o‘chiramiz
      dispatch({ type: "REMOVE_LIKED_PRODUCT", payload: prod.id });
    } else {
      // Mahsulot like bo‘lmagan – uni qo‘shamiz
      dispatch({ type: "LIKED_PRODUCTS", payload: prod });
    }

    setLiked((prev) => !prev); // UI ni yangilaymiz
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = products.find((product) => product.id === prod.id);

    if (item) {
      dispatch({ type: "INCREASE_AMOUNT", payload: prod.id });
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: { ...prod, amount: 1 } });
    }
  };

  return (
    <Link to={`/singleProduct/${prod.id}`}>
      <div className="card bg-base-100 w-96 shadow-sm gap-4 gap-x-8">
        <figure>
          <img src={prod.thumbnail} alt={prod.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {prod.title}
            <div className="badge badge-secondary">New</div>
          </h2>
          <p className="line-clamp-2">{prod.description}</p>

          <div className="card-actions justify-between items-center">
            <button onClick={handleLike} className="text-xl">
              {liked ? <FaHeart color="white" /> : <FaRegHeart />}
            </button>
            <button
              className="btn btn-outline btn-primary"
              onClick={handleSubmit}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
