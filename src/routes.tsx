import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignaturePad from "./pages/Signature";
import Home from "./pages/Home/Home";






const RoutesRoot = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/digital-signature-generator" element={<SignaturePad />} />
      
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default RoutesRoot;