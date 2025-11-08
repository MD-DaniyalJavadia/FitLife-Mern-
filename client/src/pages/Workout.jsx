// src/pages/Workout.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import api from "../api/axios";
import { format } from "date-fns";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    workoutName: "",
    category: "other",
    exercises: [{ exerciseName: "", sets: "", reps: "", weight: "", notes: "" }],
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load KaiAdmin CSS
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

    fetchWorkouts();

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) document.head.removeChild(link);
      });
    };
  }, []);

  // Fetch Workouts
  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/workouts");
      setWorkouts(res.data);
    } catch (err) {
      setError("Failed to load workouts.");
    } finally {
      setLoading(false);
    }
  };

  // FIXED: handleChange – Correctly handles exercise.0.exerciseName
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("exercise")) {
      const parts = name.split("."); // ["exercise", "0", "exerciseName"]
      const field = parts[2];        // "exerciseName"
      const updated = [...form.exercises];
      updated[index][field] = value;
      setForm({ ...form, exercises: updated });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add Exercise Row
  const addExercise = () => {
    setForm({
      ...form,
      exercises: [
        ...form.exercises,
        { exerciseName: "", sets: "", reps: "", weight: "", notes: "" },
      ],
    });
  };

  // Remove Exercise
  const removeExercise = (index) => {
    if (form.exercises.length === 1) return;
    setForm({
      ...form,
      exercises: form.exercises.filter((_, i) => i !== index),
    });
  };

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      workoutName: form.workoutName,
      category: form.category,
      exercises: form.exercises
        .filter((ex) => ex.exerciseName.trim())
        .map((ex) => ({
          exerciseName: ex.exerciseName,
          sets: Number(ex.sets) || 0,
          reps: Number(ex.reps) || 0,
          weight: Number(ex.weight) || 0,
          notes: ex.notes || "",
        })),
    };

    if (payload.exercises.length === 0) {
      setError("Add at least one exercise.");
      return;
    }

    try {
      if (editingId) {
        const res = await api.put(`/api/workouts/${editingId}`, payload);
        setWorkouts(workouts.map((w) => (w._id === editingId ? res.data.workout : w)));
        setEditingId(null);
      } else {
        const res = await api.post("/api/workouts", payload);
        setWorkouts([res.data.workout, ...workouts]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  // Edit Workout
  const startEdit = (workout) => {
    setForm({
      workoutName: workout.workoutName,
      category: workout.category,
      exercises: workout.exercises.length > 0
        ? workout.exercises.map((ex) => ({
            exerciseName: ex.exerciseName || "",
            sets: ex.sets || "",
            reps: ex.reps || "",
            weight: ex.weight || "",
            notes: ex.notes || "",
          }))
        : [{ exerciseName: "", sets: "", reps: "", weight: "", notes: "" }],
    });
    setEditingId(workout._id);
  };

  // Delete Workout
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workout?")) return;
    try {
      await api.delete(`/api/workouts/${id}`);
      setWorkouts(workouts.filter((w) => w._id !== id));
    } catch (err) {
      setError("Failed to delete");
    }
  };

  const resetForm = () => {
    setForm({
      workoutName: "",
      category: "other",
      exercises: [{ exerciseName: "", sets: "", reps: "", weight: "", notes: "" }],
    });
    setEditingId(null);
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
            <h3 className="fw-bold mb-4">Workout Tracker</h3>

            {/* Error */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError("")}></button>
              </div>
            )}

            {/* Form Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-danger text-white">
                <h5 className="mb-0">{editingId ? "Edit Workout" : "Log New Workout"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-8">
                      <label className="form-label">Workout Name</label>
                      <input
                        name="workoutName"
                        value={form.workoutName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g., Upper Body Strength"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Category</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Exercises */}
                  <div className="border rounded p-3 mb-3 bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Exercises</h6>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={addExercise}
                      >
                        + Add Exercise
                      </button>
                    </div>

                    {form.exercises.map((ex, index) => (
                      <div key={index} className="row g-2 mb-2 align-items-end">
                        <div className="col-md-3">
                          <input
                            name={`exercise.${index}.exerciseName`}
                            value={ex.exerciseName}
                            onChange={(e) => handleChange(e, index)}
                            className="form-control form-control-sm"
                            placeholder="Exercise"
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            name={`exercise.${index}.sets`}
                            type="number"
                            value={ex.sets}
                            onChange={(e) => handleChange(e, index)}
                            className="form-control form-control-sm"
                            placeholder="Sets"
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            name={`exercise.${index}.reps`}
                            type="number"
                            value={ex.reps}
                            onChange={(e) => handleChange(e, index)}
                            className="form-control form-control-sm"
                            placeholder="Reps"
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            name={`exercise.${index}.weight`}
                            type="number"
                            value={ex.weight}
                            onChange={(e) => handleChange(e, index)}
                            className="form-control form-control-sm"
                            placeholder="Weight"
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            name={`exercise.${index}.notes`}
                            value={ex.notes}
                            onChange={(e) => handleChange(e, index)}
                            className="form-control form-control-sm"
                            placeholder="Notes"
                          />
                        </div>
                        <div className="col-md-1">
                          {form.exercises.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeExercise(index)}
                            >
                              X
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="btn btn-danger me-2">
                    {editingId ? "Update" : "Save"} Workout
                  </button>
                  {editingId && (
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>
                      Cancel
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Workouts Table */}
            <div className="card shadow-sm">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">Workout History</h5>
              </div>
              <div className="card-body p-0">
                {workouts.length === 0 ? (
                  <p className="text-center py-4 text-muted">No workouts logged yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Workout</th>
                          <th>Category</th>
                          <th>Date</th>
                          <th>Exercises</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workouts.map((w) => (
                          <tr key={w._id}>
                            <td className="fw-medium">{w.workoutName}</td>
                            <td>
                              <span
                                className={`badge ${
                                  w.category === "strength"
                                    ? "bg-danger"
                                    : w.category === "cardio"
                                    ? "bg-success"
                                    : w.category === "flexibility"
                                    ? "bg-info"
                                    : "bg-secondary"
                                }`}
                              >
                                {w.category}
                              </span>
                            </td>
                            <td>{format(new Date(w.createdAt), "MMM dd, yyyy")}</td>
                            <td>{w.exercises.length} exercise(s)</td>
                            <td className="text-center">
                              <button
                                onClick={() => startEdit(w)}
                                className="btn btn-sm btn-warning me-1"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(w._id)}
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

export default Workout;