import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Userlist from "./pages/userList/Userlist";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import axios from "axios";
import { useEffect, useState, useMemo, useContext } from "react";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          {user && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Userlist />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/movies" element={<ProductList />} />
              <Route path="/product/:productId" exact element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/lists" element={<ListList />} />
              <Route path="/list/:listId" exact element={<List />} />
              <Route path="/newList" element={<NewList />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
