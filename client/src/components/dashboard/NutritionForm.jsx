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
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <div className="row g-2">
        <div className="col-md-3">
          <label>Meal Type</label>
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

        <div className="col-md-3">
          <label>Food Name</label>
          <input
            type="text"
            className="form-control"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label>Calories</label>
          <input
            type="number"
            className="form-control"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>

        <div className="col-md-1">
          <label>Protein</label>
          <input
            type="number"
            className="form-control"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
        </div>

        <div className="col-md-1">
          <label>Carbs</label>
          <input
            type="number"
            className="form-control"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>

        <div className="col-md-1">
          <label>Fat</label>
          <input
            type="number"
            className="form-control"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-2">
        <label>Notes</label>
        <textarea
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="2"
        ></textarea>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NutritionForm;
