import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";

const App = () => {
  const [muscleGroups, setMuscleGroups] = useState(() => {
    // Cargar datos iniciales desde localStorage
    const savedData = localStorage.getItem("muscleGroups");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [muscleGroup, setMuscleGroup] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [rir, setRir] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});
  const [expandedExercises, setExpandedExercises] = useState({});

  // Guardar datos en localStorage cada vez que muscleGroups cambia
  useEffect(() => {
    localStorage.setItem("muscleGroups", JSON.stringify(muscleGroups));
  }, [muscleGroups]);

  const handleAddExercise = () => {
    if (!muscleGroup || !exerciseName || !weight || !rir) return;

    const date = new Date().toISOString().split("T")[0];
    setMuscleGroups((prev) => ({
      ...prev,
      [muscleGroup]: {
        ...(prev[muscleGroup] || {}),
        [exerciseName]: [
          ...(prev[muscleGroup]?.[exerciseName] || []),
          { date, weight: Number(weight), rir: Number(rir) },
        ],
      },
    }));

    setMuscleGroup("");
    setExerciseName("");
    setWeight("");
    setRir("");
  };

  const toggleExpandGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const toggleExpandExercise = (group, exercise) => {
    setExpandedExercises((prev) => ({
      ...prev,
      [`${group}-${exercise}`]: !prev[`${group}-${exercise}`],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Training Tracker</h1>
      <div className="max-w-lg mx-auto bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Muscle Group"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          className="block w-full p-2 mb-3 border rounded"
        />
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
        {Object.keys(muscleGroups).map((group) => (
          <div key={group} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{group}</h2>
              <button
                onClick={() => toggleExpandGroup(group)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                {expandedGroups[group] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
            {expandedGroups[group] && (
              <div className="mt-4 space-y-4">
                {Object.keys(muscleGroups[group]).map((exercise) => (
                  <div key={exercise} className="border-t pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{exercise}</h3>
                      <button
                        onClick={() => toggleExpandExercise(group, exercise)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        {expandedExercises[`${group}-${exercise}`] ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                    {expandedExercises[`${group}-${exercise}`] && (
                      <LineChart
                        width={500}
                        height={300}
                        data={muscleGroups[group][exercise]}
                        className="mx-auto mt-4"
                      >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                      </LineChart>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;