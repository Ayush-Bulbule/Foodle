import { Routes, Route } from "react-router-dom"
import '@fontsource-variable/outfit';
// Supports weights 100-900

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import { Layout } from "./pages/Layout";
import NotFound from "./pages/NotFound";

import RequireAuth from "./pages/RequireAuth";
import Collection from "./pages/owner/Collection";
import Dashboard from "./pages/owner/Dashboard";


export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />} >
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />


      {/* Private Route */}
      <Route element={<RequireAuth allowedRoles={['customer']} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={['customer']} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={['owner']} />}>
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/collection" element={<Collection />} />
      </Route>

      {/* Catch All  */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes >
)


export default App;