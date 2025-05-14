import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";

const App = () => {
  const [exercises, setExercises] = useState({});
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [rir, setRir] = useState("");
  const [expanded, setExpanded] = useState({});

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

  const toggleExpand = (exercise) => {
    setExpanded((prev) => ({
      ...prev,
      [exercise]: !prev[exercise],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Training Tracker</h1>
      <div className="max-w-lg mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Add Exercise
        </button>
      </div>

      <div className="mt-10 space-y-6">
        {Object.keys(exercises).map((exercise) => (
          <div key={exercise} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{exercise}</h2>
              <button
                onClick={() => toggleExpand(exercise)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                {expanded[exercise] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
            {expanded[exercise] && (
              <div className="mt-4">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
