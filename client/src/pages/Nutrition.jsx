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
    if (id) await api.put(`/api/nutrition/${id}`, data);
    else await api.post("/api/nutrition", data);
    fetchRecords();
    setEditing(null);
  };

  const deleteRecord = async (id) => {
    if (!confirm("Delete this record?")) return;
    await api.delete(`/api/nutrition/${id}`);
    setRecords((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>Nutrition Tracker</h3>
      <NutritionForm
        onSubmit={saveRecord}
        editing={editing}
        onCancel={() => setEditing(null)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        records.map((r) => (
          <NutritionItem
            key={r._id}
            record={r}
            onEdit={() => setEditing(r)}
            onDelete={() => deleteRecord(r._id)}
          />
        ))
      )}
    </div>
  );
};

export default Nutrition;
