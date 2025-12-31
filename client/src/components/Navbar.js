import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
<button onClick={() => {
  logout();
  window.location.href = "/login";
}}>
  Logout
</button>

  return (
    <div style={{ display:"flex", justifyContent:"space-between", padding:"10px" }}>
      {user && <h3>Hello {user.name}</h3>}
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
}
