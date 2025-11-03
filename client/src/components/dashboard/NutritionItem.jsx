import React from "react";

const NutritionItem = ({ record, onEdit, onDelete }) => (
  <div className="card mb-2 p-2">
    <div className="d-flex justify-content-between align-items-start">
      <div>
        <h6 style={{ marginBottom: "2px" }}>
          {record.foodName} ({record.mealType})
        </h6>
        <small>
          {record.calories} kcal | P:{record.protein} g | C:{record.carbs} g |
          F:{record.fat} g
        </small>
        {record.notes && <p className="mt-1">{record.notes}</p>}
      </div>

      <div>
        <button className="btn btn-sm btn-secondary me-2" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default NutritionItem;
