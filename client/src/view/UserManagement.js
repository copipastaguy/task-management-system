import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import DisplayUsers from "./DisplayUsers";

const UserManagement = () => {
  // fetch the current user details and store in a object state
  // const [currentUser, setCurrentUser] = useState({
  //   username: "",
  //   password: "",
  // });

  // fetch api from localhost:3000/login
  // const [data, setData] = useState();
  // useEffect(() => {
  //   fetch("http://localhost:3002/login")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // });

  return (
    <div>
      <div className="manage">
        <div>
          <h1>Admin management</h1>
          <a href="/">
            <h2>Sign out</h2>
          </a>
        </div>

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
