import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS
import Homepage from "./view/Homepage";
import UserManagement from "./view/UserManagement";
import GroupManagement from "./view/GroupManagement";
import TasksHomepage from "./view/TasksHomepage";
import AdminRoutes from "./utils/AdminRoutes";
import UserRoutes from "./utils/UserRoutes";

function App() {
  // PROTECTED ROUTE
  // GET ADMIN PRIVILEDGE

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* admin page */}
          <Route element={<AdminRoutes />}>
            <Route path="/management" element={<UserManagement />} exact />
            <Route path="/group-management" element={<GroupManagement />} />
          </Route>

          {/* user page */}
          <Route element={<UserRoutes />}>
            <Route path="/tasks" element={<TasksHomepage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
