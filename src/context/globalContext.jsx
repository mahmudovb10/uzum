import { useReducer, createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const defaultState = {
  user: true,
  products: [],
  totalAmount: 0,
  totalPrice: 0,
  likedProducts: [],
};

const changeState = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "INIT_STATE":
      return { ...state, ...payload };

    case "ADD_PRODUCT": {
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
    }

    case "LOGOUT":
      return { ...state, user: false };

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

    case "LIKED_PRODUCTS": {
      const isAlreadyLiked = state.likedProducts.find(
        (item) => item.id === payload.id
      );
      if (isAlreadyLiked) return state;

      return {
        ...state,
        likedProducts: [...state.likedProducts, payload],
      };
    }

    case "DECREASE_AMOUNT": {
      const productToDecrease = state.products.find((p) => p.id === payload);
      if (productToDecrease?.amount === 1) {
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
    }

    case "CHANGE_AMOUNT_PRICE":
      return {
        ...state,
        totalAmount: payload.amount,
        totalPrice: payload.price,
      };

    case "ADD_TO_BASKET": {
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
    }

    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [initialStateLoaded, setInitialStateLoaded] = useState(false);
  const [state, dispatch] = useReducer(changeState, defaultState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("globalState");
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          dispatch({ type: "INIT_STATE", payload: parsed });
        } catch (e) {
          console.error("JSON parse error", e);
        }
      }
      setInitialStateLoaded(true);
    }
  }, []);

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
    if (typeof window !== "undefined") {
      localStorage.setItem("globalState", JSON.stringify(state));
    }
  }, [state]);

  if (!initialStateLoaded) return null;

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
