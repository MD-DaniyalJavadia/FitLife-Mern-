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
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import ProtectedRoute from "./components/ProtectedRoute";
import "./assets/css/style.css";

const App = () => (
  <Router>
    <Routes>
      {/* ===== Public Landing Page ===== */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <main>
              <section id="home"><Hero /></section>
              <section id="about"><About /></section>
              <section id="class"><Services /></section>
              <section id="blog"><Blog /></section>
              <section id="contact"><Contact /></section>
            </main>
            <Footer />
          </>
        }
      />

      {/* ===== Auth Pages ===== */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* ===== Protected Dashboard Routes ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/workouts"
        element={
          <ProtectedRoute>
            <Workouts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/nutrition"
        element={
          <ProtectedRoute>
            <Nutrition />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
