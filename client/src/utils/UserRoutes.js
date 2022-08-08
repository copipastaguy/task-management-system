import { Navigate, Outlet } from "react-router-dom";
const AdminRoutes = () => {
  // sessionStorage
  const authUsername = () => {
    const username = sessionStorage.getItem("username");
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
