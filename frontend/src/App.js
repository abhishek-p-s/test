import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemScreen from "./Components/ItemScreen";
import Login from "./Components/Login";
import Router from "./Routes/Router";

function App() {

  return (
    <>
      <Router />
    </>
  );
}

export default App;
