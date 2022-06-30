import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./view/Login";
import UserManagement from "./view/UserManagement";
import Tasks from "./view/Tasks";

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/management" element={<UserManagement />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
