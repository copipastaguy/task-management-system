import { Navigate, Outlet } from "react-router-dom";
const AdminRoutes = () => {
  // LOCALSTORAGE
  const authAdmin = () => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "admin") {
      return true;
    } else if (admin === "non-admin") {
      return false;
    }
  };

  const authIsAdmin = authAdmin();

  // NAVIGATE BACK TO USER PAGE
  return authIsAdmin ? <Outlet /> : <Navigate to="/tasks" />;
};

export default AdminRoutes;
