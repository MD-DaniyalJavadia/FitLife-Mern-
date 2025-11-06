import React, { useEffect, useState } from "react";

const NutritionForm = ({ onSubmit, editing, onCancel }) => {
  const [mealType, setMealType] = useState("breakfast");
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editing) {
      setMealType(editing.mealType);
      setFoodName(editing.foodName);
      setCalories(editing.calories);
      setProtein(editing.protein);
      setCarbs(editing.carbs);
      setFat(editing.fat);
      setNotes(editing.notes || "");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      mealType,
      foodName,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      notes,
    };
    onSubmit(data, editing?._id);
    if (!editing) resetForm();
  };

  const resetForm = () => {
    setMealType("breakfast");
    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setNotes("");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "30px",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontWeight: "600",
          marginBottom: "25px",
        }}
      >
        Nutrition Tracker
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label style={{ fontWeight: 500 }}>Food Name</label>
          <input
            type="text"
            className="form-control"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name"
            required
          />
        </div>

        <div className="mb-3">
          <label style={{ fontWeight: 500 }}>Meal Type</label>
          <select
            className="form-control"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <h6 style={{ color: "green", fontWeight: 600, marginTop: "25px" }}>
          Nutrition Facts
        </h6>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <div className="row g-3 align-items-center">
            <div className="col">
              <label>Calories</label>
              <input
                type="number"
                className="form-control"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
            <div className="col">
              <label>Protein (g)</label>
              <input
                type="number"
                className="form-control"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            <div className="col">
              <label>Carbs (g)</label>
              <input
                type="number"
                className="form-control"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>
            <div className="col">
              <label>Fat (g)</label>
              <input
                type="number"
                className="form-control"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label style={{ fontWeight: 500 }}>Notes</label>
          <textarea
            className="form-control"
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
          ></textarea>
        </div>

        {/* Green Add-style button (optional) */}
        <button
          type="button"
          onClick={resetForm}
          style={{
            width: "100%",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px",
            fontWeight: "500",
            marginBottom: "15px",
          }}
        >
          + Add Food
        </button>

        {/* Orange Save button */}
        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#ff4500",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px",
            fontWeight: "500",
          }}
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default NutritionForm;
