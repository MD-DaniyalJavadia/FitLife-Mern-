import React from "react";

const WorkoutItem = ({ workout, onEdit, onDelete }) => (
  <div className="card mb-2 p-2">
    <div className="d-flex justify-content-between">
      <div>
        <h5>{workout.workoutName}</h5>
        <small>{workout.category}</small>
        <ul className="mt-2">
          {workout.exercises?.map((ex, idx) => (
            <li key={idx}>
              {ex.exerciseName} — {ex.sets}x{ex.reps} ({ex.weight}kg)
            </li>
          ))}
        </ul>
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

export default WorkoutItem;
