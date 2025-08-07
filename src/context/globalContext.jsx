import { useReducer, createContext, useEffect } from "react";

export const GlobalContext = createContext();

const globalStateFromLocal = () => {
  return localStorage.getItem("globalState")
    ? JSON.parse(localStorage.getItem("globalState"))
    : {
        user: true,
        products: [],
        totalAmount: 0,
        totalPrice: 0,
        likedProducts: [],
      };
};

const changeState = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "ADD_PRODUCT":
      const existing = state.products.find((p) => p.id === payload.id);
      if (existing) {
        return {
          ...state,
          products: state.products.map((p) =>
            p.id === payload.id ? { ...p, amount: p.amount + 1 } : p
          ),
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...payload, amount: 1 }],
        };
      }

    case "LOGOUT":
      return {
        ...state,
        user: false,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload),
      };

    case "INCREASE_AMOUNT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === payload
            ? { ...product, amount: product.amount + 1 }
            : product
        ),
      };
    case "REMOVE_LIKED_PRODUCT":
      return {
        ...state,
        likedProducts: state.likedProducts.filter(
          (item) => item.id !== payload
        ),
      };
    case "LIKED_PRODUCTS":
      const isAlreadyLiked = state.likedProducts.some(
        (item) => item.id === payload.id
      );
      if (isAlreadyLiked) return state;

      return {
        ...state,
        likedProducts: [...state.likedProducts, payload],
      };

    case "DECREASE_AMOUNT":
      const productToDecrease = state.products.find((p) => p.id === payload);
      if (productToDecrease.amount === 1) {
        return {
          ...state,
          products: state.products.filter((product) => product.id !== payload),
        };
      } else {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === payload
              ? { ...product, amount: product.amount - 1 }
              : product
          ),
        };
      }

    case "CHANGE_AMOUNT_PRICE":
      return {
        ...state,
        totalAmount: payload.amount,
        totalPrice: payload.price,
      };
    case "ADD_TO_BASKET":
      const existingProduct = state.products.find((p) => p.id === payload.id);
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === payload.id
              ? { ...product, amount: product.amount + 1 }
              : product
          ),
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...payload, amount: 1 }],
        };
      }

    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, globalStateFromLocal());

  useEffect(() => {
    let price = 0;
    let amount = 0;

    state.products.forEach((product) => {
      price += product.amount * product.price;
      amount += product.amount;
    });

    dispatch({ type: "CHANGE_AMOUNT_PRICE", payload: { price, amount } });
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
