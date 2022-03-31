import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const isLogged = localStorage.getItem("userInfo");

  return isLogged ? <Component /> : <Navigate to="/login" />;
}
