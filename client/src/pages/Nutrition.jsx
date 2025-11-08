import React, { useEffect, useState } from "react";
import api from "../api/axios";
import NutritionForm from "../components/dashboard/NutritionForm";
import NutritionItem from "../components/dashboard/NutritionItem";

const Nutrition = () => {
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/api/nutrition");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const saveRecord = async (data, id = null) => {
    try {
      if (id) await api.put(`/api/nutrition/${id}`, data);
      else await api.post("/api/nutrition", data);
      fetchRecords();
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert("Error saving nutrition record.");
    }
  };

  const deleteRecord = async (id) => {
    if (!confirm("Delete this record?")) return;
    await api.delete(`/api/nutrition/${id}`);
    setRecords((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Nutrition Tracker
      </h2>

      <NutritionForm
        onSubmit={saveRecord}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No records yet.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {records.map((r) => (
            <NutritionItem
              key={r._id}
              record={r}
              onEdit={() => setEditing(r)}
              onDelete={() => deleteRecord(r._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Nutrition;
