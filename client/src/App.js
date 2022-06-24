import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./view/Login";
import UserManagement from "./view/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
