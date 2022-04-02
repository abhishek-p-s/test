import React from "react";
import Home from "../Components/Home";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ItemScreen from "../Components/ItemScreen";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Task from "../Components/Task";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<PrivateRoute component={Task} />} />
          <Route
            path="/item/:id"
            element={<PrivateRoute component={ItemScreen} />}
          />
          <Route
            path="/item"
            element={<PrivateRoute component={ItemScreen} />}
          />
          <Route
            path="*"
            element={<PrivateRoute component={Home} />}
            exact
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
