import React, { useEffect, useState } from "react";

const NutritionForm = ({ onSubmit, editing, onCancel }) => {
  const [form, setForm] = useState({
    mealName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    notes: "",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, editing?._id);
    setForm({
      mealName: "",
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <input
          type="text"
          name="mealName"
          placeholder="Meal Name"
          value={form.mealName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={form.calories}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="protein"
          placeholder="Protein (g)"
          value={form.protein}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="carbs"
          placeholder="Carbs (g)"
          value={form.carbs}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="fats"
          placeholder="Fats (g)"
          value={form.fats}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
        rows="2"
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      ></textarea>

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" style={saveBtn}>
          {editing ? "Update" : "Save"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} style={cancelBtn}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

// Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const saveBtn = {
  flex: 1,
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelBtn = {
  flex: 1,
  background: "#999",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default NutritionForm;
