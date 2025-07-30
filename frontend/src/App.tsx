import { LoginForm } from "@/page/login-form";
import { SignUpForm } from "@/page/signup-form";
import { Home } from "@/page/home";
import { ProductPage } from "@/page/product";
import { CheckoutPage } from "@/page/checkout";
import { UploadPrescriptionPage } from "@/page/upload_prescription";
import { StoreLocationPage } from "@/page/store_location";
import { ProductDetailPage } from "@/page/product-page";
import { Track } from "@/page/track";

// import { StaffDashboard } from "@/components/staff_dashboard";
// import { AdminDashboard } from "@/components/admin_dashboard";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence mode="wait">
        // ROUTES
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/prescription" element={<UploadPrescriptionPage />} />
        <Route path="/branches" element={<StoreLocationPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/track" element={<Track/>} />

        {/* <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
