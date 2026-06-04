import { createRoot } from "react-dom/client";
import "./reset.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import CartPage from "./pages/CartPage/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
    </Route>,
  ),
);

const root = document.getElementById("root");
createRoot(root!).render(<RouterProvider router={router} />);
