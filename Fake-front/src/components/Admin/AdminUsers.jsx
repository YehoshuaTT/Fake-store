import axios from "axios";
import { useEffect, useState } from "react";
import UserTable from "../Table/UserTable";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:3001/auth/users  ", {
        headers: { autherization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(data);
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="admin-users">
      users
      {users && <UserTable data={users} />}
    </div>
  );
}

export default AdminUsers;
