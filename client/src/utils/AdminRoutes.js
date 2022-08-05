import { Navigate, Outlet } from "react-router-dom";
const AdminRoutes = () => {
  // LOCALSTORAGE
  const authAdmin = () => {
    const admin = localStorage.getItem("isAdmin");
    // console.log(admin);
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
