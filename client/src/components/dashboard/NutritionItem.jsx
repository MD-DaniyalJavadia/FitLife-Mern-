import React from "react";

const NutritionItem = ({ record, onEdit, onDelete }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        border: "1px solid #eee",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <div>
          <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>
            {record.foodName} ({record.mealType})
          </h4>
          <p style={{ margin: "0", color: "#555", fontSize: "14px" }}>
            {record.calories} kcal | P:{record.protein}g | C:{record.carbs}g | F:{record.fat}g
          </p>
          {record.notes && (
            <p style={{ marginTop: "5px", color: "#777" }}>{record.notes}</p>
          )}
        </div>

        <div>
          <button
            onClick={onEdit}
            style={{
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              marginRight: "8px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              background: "#ff4500",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionItem;
