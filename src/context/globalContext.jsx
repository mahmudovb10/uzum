import { useReducer, createContext, useEffect } from "react";

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, payload] };
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
    case "DECREASE_AMOUNT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === payload
            ? { ...product, amount: product.amount - 1 }
            : product
        ),
      };
    case "CHANGE_AMOUNT_PRICE":
    case "PLUS":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === payload
            ? { ...product, amount: product.amount + 1 }
            : product
        ),
      };
      return {
        ...state,
        totalAmount: payload.amount,
        totalPrice: payload.price,
      };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: true,
    products: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    let price = 0;
    let amount = 0;

    state.products.forEach((product) => {
      price += product.amount * product.price;
      amount += product.amount;
    });

    dispatch({ type: "CHANGE_AMOUNT_PRICE", payload: { price, amount } });
  }, [state.products]);
  console.log(state);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
