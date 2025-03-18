import { useState, useEffect } from "react";
import "../styles/App.css";

const RoutinePage = ({ userData }) => {
  const { name, month, year, routines } = userData;
  const [progress, setProgress] = useState(() => {
    const savedProgress = JSON.parse(localStorage.getItem("progress"));
    return savedProgress || {};
  });

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  const handleMark = (routine, day) => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Prevent marking future days
    if (
      year > currentYear ||
      (year === currentYear && month > currentMonth) ||
      (year === currentYear && month === currentMonth && day > currentDay)
    ) {
      return;
    }

    const updatedProgress = { ...progress };
    if (!updatedProgress[routine]) {
      updatedProgress[routine] = [];
    }
    if (updatedProgress[routine].includes(day)) {
      updatedProgress[routine] = updatedProgress[routine].filter((d) => d !== day);
    } else {
      updatedProgress[routine].push(day);
    }
    setProgress(updatedProgress);
  };

  return (
    <div className="routine-page">
      <h1>
        {name}, track your routine for <span>{month}, {year}</span>
      </h1>
      <div className="table-container">
      <table>
        <colgroup>
          <col className="routine-column" />
          <col className="day-column" span="31" />
        </colgroup>
        <thead>
          <tr>
            <th className="sticky-column">Routine</th>
            {Array.from({ length: 31 }, (_, i) => (
              <th key={i + 1}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {routines.map((routine, index) => (
            <tr key={index}>
              <td className="sticky-column">{routine}</td>
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const today = new Date();
                const isFuture =
                  year > today.getFullYear() ||
                  (year === today.getFullYear() && month > today.getMonth() + 1) ||
                  (year === today.getFullYear() && month === today.getMonth() + 1 && day > today.getDate());

                const isMarked = progress[routine]?.includes(day);
                return (
                  <td
                    key={day}
                    className={`day-cell ${isMarked ? "marked" : ""} ${isFuture ? "disabled" : ""}`}
                    onClick={() => !isFuture && handleMark(routine, day)}
                  >
                    {isMarked ? "✔" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
  </div>

    </div>
  );
};

export default RoutinePage;

