import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemScreen from "./Components/ItemScreen";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/item/:id" element={<ItemScreen />} />
          <Route path="/item" element={<ItemScreen />} />
          <Route path="/" element={<Home />} exact></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
