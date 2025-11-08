// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", profilePic: "/img/profile.jpg" });
  const [form, setForm] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load KaiAdmin CSS (same as Dashboard)
  useEffect(() => {
    const styles = [
      "/admin/css/bootstrap.min.css",
      "/admin/css/plugins.min.css",
      "/admin/css/kaiadmin.min.css",
      "/admin/css/demo.css",
      "/admin/css/fonts.min.css",
    ];

    const links = styles.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
        setForm({ name: res.data.name || "", email: res.data.email || "" });
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(selected);
    }
  };

  // Save profile
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    if (file) formData.append("profilePic", file);

    try {
      const res = await api.put("/api/auth/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data);
      setSuccess("Profile updated successfully!");
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Navbar />
        <div className="container mt-4">
          <div className="page-inner">
            <h3 className="fw-bold mb-4">My Profile</h3>

            {/* Alerts */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError("")}></button>
              </div>
            )}
            {success && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {success}
                <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
              </div>
            )}

            {/* Profile Card */}
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Edit Profile</h5>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="rounded-circle shadow-sm"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <div className="mt-3">
                    <label className="btn btn-primary btn-sm">
                      Change Photo
                      <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>

                <form onSubmit={handleSave}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Additional Info Card (Optional) */}
            <div className="card shadow-sm mt-4">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Account Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mb-2"><strong>Member Since:</strong></p>
                    <p className="text-muted">January 2025</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-2"><strong>Total Workouts:</strong></p>
                    <p className="text-muted">24</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-2"><strong>Meals Logged:</strong></p>
                    <p className="text-muted">68</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-2"><strong>Goal:</strong></p>
                    <p className="text-muted">Build Muscle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;