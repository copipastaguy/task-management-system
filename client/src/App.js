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
import EditTask from "./view/EditTask";

import AdminRoutes from "./utils/AdminRoutes";
import UserRoutes from "./utils/UserRoutes";
import ViewTask from "./view/Modal/ViewTask";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* admin page */}
          <Route element={<AdminRoutes />}>
            <Route path="/management" element={<UserManagement />} exact />
            <Route path="/group-management" element={<GroupManagement />} />
          </Route>

          {/* user page */}
          <Route path="/tasks" element={<UserRoutes />}>
            <Route
              index
              element={
                <>
                  <Header />
                  <TasksHomepage />
                </>
              }
            />
            <Route path="/tasks/:app_acronym" element={<ApplicationKanban />} />
            <Route
              path="/tasks/:app_acronym/:task_name"
              element={<EditTask />}
            />
            <Route
              path="/tasks/:app_acronym/view/:task_name"
              element={<ViewTask />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
