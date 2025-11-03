import React, { useEffect, useState } from "react";

const emptyExercise = () => ({
  exerciseName: "",
  sets: "",
  reps: "",
  weight: "",
  notes: "",
});

const WorkoutForm = ({ onSubmit, editing, onCancel }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [category, setCategory] = useState("strength");
  const [exercises, setExercises] = useState([emptyExercise()]);

  useEffect(() => {
    if (editing) {
      setWorkoutName(editing.workoutName);
      setCategory(editing.category);
      setExercises(editing.exercises || [emptyExercise()]);
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { workoutName, category, exercises };
    onSubmit(data, editing?._id);
    setWorkoutName("");
    setExercises([emptyExercise()]);
  };

  const handleExerciseChange = (i, field, value) => {
    const updated = [...exercises];
    updated[i][field] = value;
    setExercises(updated);
  };

  const addExercise = () => setExercises([...exercises, emptyExercise()]);
  const removeExercise = (i) =>
    setExercises(exercises.filter((_, idx) => idx !== i));

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <div className="mb-2">
        <label>Workout Name</label>
        <input
          className="form-control"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label>Category</label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
        </select>
      </div>

      <div>
        <label>Exercises</label>
        {exercises.map((ex, i) => (
          <div key={i} className="d-flex gap-2 mb-2">
            <input
              placeholder="Name"
              value={ex.exerciseName}
              onChange={(e) =>
                handleExerciseChange(i, "exerciseName", e.target.value)
              }
              className="form-control"
            />
            <input
              placeholder="Sets"
              value={ex.sets}
              onChange={(e) => handleExerciseChange(i, "sets", e.target.value)}
              className="form-control"
              type="number"
            />
            <input
              placeholder="Reps"
              value={ex.reps}
              onChange={(e) => handleExerciseChange(i, "reps", e.target.value)}
              className="form-control"
              type="number"
            />
            <input
              placeholder="Weight"
              value={ex.weight}
              onChange={(e) =>
                handleExerciseChange(i, "weight", e.target.value)
              }
              className="form-control"
              type="number"
            />
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeExercise(i)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={addExercise}
        >
          Add Exercise
        </button>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary">
          {editing ? "Update" : "Save"}
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

export default WorkoutForm;
