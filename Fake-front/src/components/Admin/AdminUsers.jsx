import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserTable from "../Table/UserTable";
function AdminUsers({ users }) {
  const baseURL = "http://localhost:3001";

  return (
    <div className="admin-users">
      users
      {/* <button onClick={() => trying()}>click</button> */}
      {users && <UserTable data={users} />}
    </div>
  );
}

export default AdminUsers;
