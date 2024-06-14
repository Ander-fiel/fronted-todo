import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import "./index.css";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { TaskModal } from "./components/TaskModal.jsx";
import Task from "./pages/Task.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Privadas */}
      <Route path="/" element={<PrivateRoute element={<Home />} />}></Route>
      <Route
        path="/task/:id"
        element={<PrivateRoute element={<Task />} />}
      ></Route>
      {/* Publicas */}
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
