import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignaturePad from "./pages/Signature";
import Home from "./pages/Home/Home";
import MongoDBServerlessPricingCalculator from "./components/MongoDbPricing/MongoDbPricing";

const RoutesRoot = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/digital-signature-generator"
            element={<SignaturePad />}
          />
          <Route
            path="/mongodb-serverless-pricing-calculator"
            element={<MongoDBServerlessPricingCalculator />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RoutesRoot;
