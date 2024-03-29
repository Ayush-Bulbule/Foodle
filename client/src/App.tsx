import { Routes, Route } from "react-router-dom"
import '@fontsource-variable/outfit';
// Supports weights 100-900

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/UserProfile";
import { Layout } from "./pages/Layout";
import NotFound from "./pages/NotFound";

import RequireAuth from "./pages/RequireAuth";
import Dashboard from "./pages/owner/Dashboard";
import RestaurantDetails from "./pages/RestaurantDetails";
import PersistLogin from "./pages/PersistLogin";
import Earnings from "./pages/owner/Earnings";
import ManageOrders from "./pages/owner/ManageOrders";
import AddMenu from "./pages/owner/AddMenu";
import RestaurantProfile from "./pages/owner/RestaurantProfile";
import Orders from "./pages/Orders";
import OwnerLayout from "./pages/owner/OwnerLayout";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";


export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />} >
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />


      {/* Private Route */}
      <Route element={<PersistLogin />}>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="restaurant/:id" element={<RestaurantDetails />} />

        {/* Customer Routes */}
        <Route element={<RequireAuth allowedRoles={['customer']} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Route>

        {/* Rider Routes */}
        <Route element={<RequireAuth allowedRoles={['rider']} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Owner Routes */}
        <Route element={<RequireAuth allowedRoles={['owner']} />}>
          {/* Layout For Owner */}
          <Route path="/owner" element={<OwnerLayout />} >
            <Route path="/owner/dashboard" element={<Dashboard />} />
            <Route path="/owner/earnings" element={<Earnings />} />
            <Route path="/owner/orders" element={<ManageOrders />} />
            <Route path="/owner/addmenu" element={<AddMenu />} />
            <Route path="/owner/restaurant/" element={<RestaurantProfile />} />
            <Route path="/owner/profile/" element={<Profile />} />
          </Route>
        </Route>
        {/* Catch All  */}
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes >
)


export default App;