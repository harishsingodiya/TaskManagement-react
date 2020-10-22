import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux";

function Users() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

 

  useEffect(() => {
    const initialsLoad = async () => {
      document.getElementById("overlay").style.display = "block";
      await dispatch(fetchUsers());
      document.getElementById("overlay").style.display = "none";
    };
    initialsLoad();
  }, []);

  return (
    <div className="container-fluid text-left p-4">
      <div className="card">
        <div className="card-header">
          <h4>Users</h4>
        </div>
        <div className="card-body">
          {!userData.users.length ? (
            <h2>Loading....</h2>
          ) : userData.error ? (
            <h2>{userData.error}</h2>
          ) : (
            <div className="d-flex">
              {userData &&
                userData.users &&
                userData.users.map((user) => (
                  <div
                    key={user.id}
                    className="card mr-2"
                    style={{ width: "18rem" }}
                  >
                    <img
                      className="card-img-top"
                      src={user.picture}
                      alt={user.name}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title w-auto">{user.name}</h5>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Users;
