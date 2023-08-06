import * as React from "react"
import { Routes, Route } from "react-router-dom"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
// Supports weights 100-900
import '@fontsource-variable/outfit';

import { extendTheme } from "@chakra-ui/react"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

// 2. Call `extendTheme` and pass your custom values
const appTheme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Outfit Variable', sans-serif`,
  },
  colors: {
    primary: {
      100: "#FEF7F9",
      200: "#FDE2E7",
      300: "#FCCDDF",
      400: "#FBB8D6",
      500: "#FAA3CE",
      600: "#F88EB5",
      700: "#F679AD",
      800: "#F464A5",
      900: "#F34F9D"
    },
    test: {
      "primaryOrange": "#FFA500",
      "secondaryGreen": "#4CAF50",
      "neutralGrey": "#757575",
      "accentYellow": "#FFD700"
    }
  },
})

export const App = () => (
  <ChakraProvider theme={appTheme}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </ChakraProvider >
)
