// src/pages/Nutrition.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import api from "../api/axios"; // ← Aapka existing axios
import { format } from "date-fns";

const Nutrition = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    mealName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    date: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

    fetchRecords();

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Fetch Nutrition Records
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/nutrition");
      setRecords(res.data);
    } catch (err) {
      setError("Failed to load nutrition data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      mealName: form.mealName,
      calories: Number(form.calories),
      protein: form.protein ? Number(form.protein) : 0,
      carbs: form.carbs ? Number(form.carbs) : 0,
      fats: form.fats ? Number(form.fats) : 0,
      date: form.date || new Date().toISOString(),
      notes: form.notes,
    };

    try {
      if (editingId) {
        const res = await api.put(`/api/nutrition/${editingId}`, payload);
        setRecords(records.map((r) => (r._id === editingId ? res.data.nutrition : r)));
        setEditingId(null);
      } else {
        const res = await api.post("/api/nutrition", payload);
        setRecords([res.data.nutrition, ...records]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  const startEdit = (record) => {
    setForm({
      mealName: record.mealName,
      calories: record.calories,
      protein: record.protein || "",
      carbs: record.carbs || "",
      fats: record.fats || "",
      date: record.date ? format(new Date(record.date), "yyyy-MM-dd") : "",
      notes: record.notes || "",
    });
    setEditingId(record._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this meal?")) return;
    try {
      await api.delete(`/api/nutrition/${id}`);
      setRecords(records.filter((r) => r._id !== id));
    } catch (err) {
      setError("Failed to delete");
    }
  };

  const resetForm = () => {
    setForm({ mealName: "", calories: "", protein: "", carbs: "", fats: "", date: "", notes: "" });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="container mt-5">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
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
            <h3 className="fw-bold mb-4">Nutrition Tracker</h3>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError("")}></button>
              </div>
            )}

            {/* Form Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{editingId ? "Edit Meal" : "Log New Meal"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Meal Name</label>
                      <input
                        name="mealName"
                        value={form.mealName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g., Chicken Rice"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Calories</label>
                      <input
                        name="calories"
                        type="number"
                        value={form.calories}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="350"
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Protein (g)</label>
                      <input
                        name="protein"
                        type="number"
                        value={form.protein}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="30"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Carbs (g)</label>
                      <input
                        name="carbs"
                        type="number"
                        value={form.carbs}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="45"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Fats (g)</label>
                      <input
                        name="fats"
                        type="number"
                        value={form.fats}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="15"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Date</label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="form-control"
                        rows="2"
                        placeholder="e.g., Post-workout meal"
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary me-2">
                        {editingId ? "Update" : "Add"} Meal
                      </button>
                      {editingId && (
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Records Table */}
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Meal History</h5>
              </div>
              <div className="card-body p-0">
                {records.length === 0 ? (
                  <p className="text-center py-4 text-muted">No meals logged yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Meal</th>
                          <th>Date</th>
                          <th className="text-center">Cal</th>
                          <th className="text-center">P</th>
                          <th className="text-center">C</th>
                          <th className="text-center">F</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((r) => (
                          <tr key={r._id}>
                            <td className="fw-medium">{r.mealName}</td>
                            <td>{format(new Date(r.date), "MMM dd, yyyy")}</td>
                            <td className="text-center text-danger fw-bold">{r.calories}</td>
                            <td className="text-center">{r.protein || 0}</td>
                            <td className="text-center">{r.carbs || 0}</td>
                            <td className="text-center">{r.fats || 0}</td>
                            <td className="text-center">
                              <button
                                onClick={() => startEdit(r)}
                                className="btn btn-sm btn-warning me-1"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(r._id)}
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;