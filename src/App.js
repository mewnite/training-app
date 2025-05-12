import React, { useState } from "react";

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    name: "",
    weight: "",
    rir: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.weight && form.rir) {
      setExercises([...exercises, form]);
      setForm({ name: "", weight: "", rir: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Registro de Entrenamientos</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre del ejercicio"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Peso levantado (kg)"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="rir"
            value={form.rir}
            onChange={handleChange}
            placeholder="RIR (Reps in Reserve)"
            className="border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Agregar ejercicio
          </button>
        </form>
        <h2 className="text-xl font-bold mb-4">Historial de Ejercicios</h2>
        <ul className="space-y-2">
          {exercises.map((exercise, index) => (
            <li
              key={index}
              className="border rounded-lg px-4 py-2 flex justify-between"
            >
              <span>{exercise.name}</span>
              <span>{exercise.weight} kg</span>
              <span>RIR: {exercise.rir}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
