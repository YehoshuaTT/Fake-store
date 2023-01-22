import { Link, useParams } from "react-router-dom";
function Admin() {
  return (
    <div className="admin-nav-bar-container">
      <nav className="admin-nav-bar">
        <ul className="link-title">
          <Link to="/adminproducts"> products </Link>
        </ul>
        <ul className="link-title">
          <Link to="/creat"> New Product </Link>
        </ul>
        <ul className="link-title">
          <Link to="/sales"> Sales </Link>
        </ul>
        <ul className="link-title">
          <Link to="/users"> users </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Admin;
