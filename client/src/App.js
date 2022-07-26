import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// COMPONENTS
import Homepage from "./view/Homepage";
import Header from "./view/Header";
import UserManagement from "./view/UserManagement";
import GroupManagement from "./view/GroupManagement";
import TasksHomepage from "./view/TasksHomepage";
import ApplicationKanban from "./view/ApplicationKanban";

import AdminRoutes from "./utils/AdminRoutes";
import UserRoutes from "./utils/UserRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* admin page */}
          <Route element={<AdminRoutes />}>
            <Route path="/management" element={<UserManagement />} exact />
            <Route path="/group-management" element={<GroupManagement />} />
          </Route>

          {/* user page */}
          <Route path="/tasks" element={<UserRoutes />}>
            <Route index element={<TasksHomepage />} />
            <Route path=":app_acronym" element={<ApplicationKanban />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
