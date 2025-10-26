import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Wrap Routes with Router
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import "./assets/css/style.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router> {/* Wrap your app in Router */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <Hero />
                <About />
                <Services/>
                  {/* <Route path="/register" element={<Services />} /> */}
                <Blog />
                <Contact />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
