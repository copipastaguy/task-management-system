import { Navigate, Outlet } from "react-router-dom";
const AdminRoutes = () => {
  // LOCALSTORAGE
  const authUsername = () => {
    const username = localStorage.getItem("username");
    if (username) {
      return true;
    } else {
      return false;
    }
  };

  const authUser = authUsername();

  // NAVIGATE BACK TO LOGIN
  return authUser ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
