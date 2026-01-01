import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [cameras, setCameras] = useState([]);
  const [camera, setCamera] = useState({
    title: "",
    brand: "",
    pricePerDay: "",
    location: ""
  });

  const chooseType = async (type) => {
    const res = await API.post("/api/auth/set-user-type", {
      userId: user._id,
      userType: type
    });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  useEffect(() => {
    if (user?.userType === "renter") {
      API.get("/api/cameras").then(res => setCameras(res.data));
    }
  }, [user]);

  const addCamera = async () => {
    await API.post("/api/cameras/add", {
      ...camera,
      ownerId: user._id
    });
    alert("Camera added");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={logout}>Logout</button>

      {!user.userType && (
        <>
          <button onClick={() => chooseType("renter")}>Rent Camera</button>
          <button onClick={() => chooseType("owner")}>Give Camera</button>
        </>
      )}

      {user.userType === "renter" &&
        cameras.map(cam => (
          <div key={cam._id}>
            <h4>{cam.title}</h4>
            <p>{cam.brand} - ₹{cam.pricePerDay}</p>
          </div>
        ))}

      {user.userType === "owner" && (
        <>
          <input placeholder="Title" onChange={e => setCamera({ ...camera, title: e.target.value })} />
          <input placeholder="Brand" onChange={e => setCamera({ ...camera, brand: e.target.value })} />
          <input placeholder="Price" onChange={e => setCamera({ ...camera, pricePerDay: e.target.value })} />
          <input placeholder="Location" onChange={e => setCamera({ ...camera, location: e.target.value })} />
          <button onClick={addCamera}>Add Camera</button>
        </>
      )}
    </div>
  );
}

export default Home;
