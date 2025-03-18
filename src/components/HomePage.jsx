import { useState } from "react";
import "../styles/App.css"; // Correct path for App.css

const HomePage = ({ onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [routines, setRoutines] = useState(Array(10).fill(""));

  const handleRoutineChange = (index, value) => {
    const updatedRoutines = [...routines];
    updatedRoutines[index] = value;
    setRoutines(updatedRoutines);
  };

  const handleSubmit = () => {
    const data = { name, email, year, month, routines: routines.filter(Boolean) };
    onSave(data);
  };

  return (
    <div className="home-page">
      <h1>Set Your Routine</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        {routines.map((routine, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Routine ${index + 1}`}
            value={routine}
            onChange={(e) => handleRoutineChange(index, e.target.value)}
          />
        ))}
        <button onClick={handleSubmit}>Set Routine</button>
      </div>
    </div>
  );
};

export default HomePage;
