import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";

import Products from "./components/Products";

import ProductListGrid from "./components/ProductListGrid";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productgrid" element={<ProductListGrid />} />
      </Routes>
    </>
  );
}

export default App;
