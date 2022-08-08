import { Navigate, Outlet } from "react-router-dom";
const AdminRoutes = () => {
  // sessionStorage
  const admin = sessionStorage.getItem("isAdmin");
  const authAdmin = () => {
    if (admin === "true") {
      return true;
    } else if (admin === "false") {
      return false;
    }
  };
  const authIsAdmin = authAdmin();

  // NAVIGATE BACK TO USER PAGE
  return authIsAdmin ? <Outlet /> : <Navigate to="/tasks" />;
};

export default AdminRoutes;
