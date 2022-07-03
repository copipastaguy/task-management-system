import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./view/Header";
import Homepage from "./view/Homepage";
import UserManagement from "./view/UserManagement";
import Tasks from "./view/Tasks";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* admin page */}
          <Route path="/management" element={<UserManagement />} />

          {/* user page */}
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
