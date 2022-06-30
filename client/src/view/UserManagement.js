import Header from "./Header";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import DisplayUsers from "./DisplayUsers";

const UserManagement = () => {
  return (
    <div className="container">
      <Header />
      <h1>User Management</h1>
      <div className="manage">
        {/* display if admin */}
        <AddUser />

        {/* display if user */}
        <UpdateUser />
        {/* <DisplayUsers /> */}
      </div>
    </div>
  );
};

export default UserManagement;
