import { useEffect, useState } from "react";
import UserTable from "../components/Tables/UserTable";
import apiCalls from "../functions/apiRequest";

function AdminUsers() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      apiCalls("get", "/auth/users").then(({ data }) => setUsers(data));
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
