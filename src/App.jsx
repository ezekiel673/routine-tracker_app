import { useState } from "react";
import HomePage from "./components/HomePage";
import RoutinePage from "./components/RoutinePage";
import "./styles/App.css";

const App = () => {
  const [userData, setUserData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    return savedData || null;
  });

  const handleDataSave = (data) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  return (
    <div className="App">
      {userData ? (
        <RoutinePage userData={userData} />
      ) : (
        <HomePage onSave={handleDataSave} />
      )}
    </div>
  );
};

export default App;
