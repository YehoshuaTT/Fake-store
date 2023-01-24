import { useEffect, useState } from "react";
import UserTable from "../Tables/UserTable";

function AdminUsers() {
  const [users, setUsers] = useState();
  useEffect(() => {
    apiCalls("get", `/auth/users`).then(({ data }) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  return (
    <div className="admin-users">
      users
      {users && <UserTable data={users} />}
    </div>
  );
}

export default AdminUsers;
