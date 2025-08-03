import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useGlobalContext } from "./hooks/useGlobalContext";
import Basket from "./pages/Basket";

import MainLayout from "./layouts/MainLayout";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";

import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  const { user } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/basket",
          element: <Basket />,
        },
        {
          path: "/singleProduct/:id",
          element: <SingleProduct />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
