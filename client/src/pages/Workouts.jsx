import React, { useState } from "react";
import axios from "axios";

const Workouts = () => {
  const [workout, setWorkout] = useState({
    workoutName: "",
    category: "strength", // lowercase for enum
    exercises: [{ name: "", sets: "", reps: "", weight: "" }],
  });

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleExerciseChange = (index, e) => {
    const newExercises = [...workout.exercises];
    newExercises[index][e.target.name] = e.target.value;
    setWorkout({ ...workout, exercises: newExercises });
  };

  const addExercise = () => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { name: "", sets: "", reps: "", weight: "" }],
    });
  };

  const removeExercise = (index) => {
    const newExercises = workout.exercises.filter((_, i) => i !== index);
    setWorkout({ ...workout, exercises: newExercises });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/workouts",
        workout,
        { withCredentials: true }
      );
      alert(response.data.message || "Workout saved successfully");

      // Reset form
      setWorkout({
        workoutName: "",
        category: "strength",
        exercises: [{ name: "", sets: "", reps: "", weight: "" }],
      });
    } catch (err) {
      console.error("Error saving workout:", err.response || err);
      if (err.response?.data?.error) {
        alert(`Error: ${err.response.data.error}`);
      } else {
        alert("Error saving workout. Try again.");
      }
    }
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
        Workout Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Workout Info */}
        <div style={{ marginBottom: "15px" }}>
          <label>Workout Name</label>
          <input
            type="text"
            name="workoutName"
            value={workout.workoutName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Category</label>
          <select
            name="category"
            value={workout.category}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          >
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
          </select>
        </div>

        {/* Exercises Section */}
        <h4 style={{ marginBottom: "10px", color: "#4CAF50" }}>Exercises</h4>
        {workout.exercises.map((exercise, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(index, e)}
              />
              <input
                type="number"
                name="sets"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, e)}
              />
              <input
                type="number"
                name="reps"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => handleExerciseChange(index, e)}
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={exercise.weight}
                onChange={(e) => handleExerciseChange(index, e)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeExercise(index)}
              style={{
                background: "none",
                border: "none",
                color: "red",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              ✕ Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addExercise}
          style={{
            display: "block",
            width: "100%",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          + Add Exercise
        </button>

        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            background: "#ff4500",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default Workouts;
