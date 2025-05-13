import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const App = () => {
  const [exercises, setExercises] = useState({});
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [rir, setRir] = useState("");

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("exercises");
    if (savedData) {
      setExercises(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  // Handle adding a new exercise entry
  const handleAddExercise = () => {
    if (!exerciseName || !weight || !rir) return;

    const date = new Date().toISOString().split("T")[0];
    setExercises((prev) => ({
      ...prev,
      [exerciseName]: [
        ...(prev[exerciseName] || []),
        { date, weight: Number(weight), rir: Number(rir) },
      ],
    }));
    setExerciseName("");
    setWeight("");
    setRir("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Training Tracker</h1>
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="RIR"
          value={rir}
          onChange={(e) => setRir(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleAddExercise}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Exercise
        </button>
      </div>

      <div className="mt-6">
        {Object.keys(exercises).map((exercise) => (
          <div key={exercise} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{exercise}</h2>
            <LineChart
              width={500}
              height={300}
              data={exercises[exercise]}
              className="mx-auto"
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            </LineChart>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
