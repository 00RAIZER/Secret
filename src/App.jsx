import { BrowserRouter, Routes, Route } from "react-router-dom";
import WishPage from "./birthday/WishPage";
import CakePage from "./birthday/CakePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WishPage />} />
        <Route path="/cake" element={<CakePage />} />
      </Routes>
    </BrowserRouter>
  );
}