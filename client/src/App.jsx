import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./assets/css/style.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ===== Main Landing Page ===== */}
        <Route
          path="/"
          element={
            <>
              <Header />

              <main>
                {/* Each section has an ID that matches react-scroll 'to' prop */}
                <section id="home">
                  <Hero />
                </section>

                <section id="about">
                  <About />
                </section>

                <section id="class">
                  <Services />
                </section>

                <section id="blog">
                  <Blog />
                </section>

                <section id="contact">
                  <Contact />
                </section>
              </main>

              <Footer />
            </>
          }
        />

{/* Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
