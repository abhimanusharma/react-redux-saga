import React, { useEffect } from "react";
import { AddUser, RemoveUser, GetUsers } from "./redux/userAction";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const App = () => {
  const [userName, setUserName] = React.useState();
  const [userCity, setUserCity] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state?.userReducer);
  let users = userStore?.users?.sort((a, b) => b.id - a.id);
  const handleUpdateUser = () => {
    if (!userName || !userCity) {
      if (!userName) {
        let message = {
          type: "Error",
          Errors: ["Name is required"]
        };
        let msgs = [...messages, message];
        setMessages(msgs);
      }
      if (!userCity) {
        let message = {
          type: "Error",
          Errors: ["CIty is required"]
        };
        let msgs = [...messages, message];
        setMessages(msgs);
      }
    } else {
      const userData = {
        id: v4(),
        name: userName,
        address: {
          city: userCity
        }
      };
      dispatch(AddUser(userData));
    }
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeUserCity = (e) => {
    setUserCity(e.target.value);
  };
  const handleRemove = (user) => {
    const isConfirm = window.confirm("Are you sure?");
    if (isConfirm) {
      dispatch(RemoveUser(user));
    }
  };

  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  useEffect(() => {
    setUserName(null);
    setUserCity(null);
  }, [users]);

  return (
    <>
      <header className="flex flex-wrap justify-center">
        <div className="w-full text-center mb-3">
          <h2 className="text-[20px] font-medium">User List</h2>
        </div>
        <input
          placeholder="Enter name"
          type="text"
          name="userName"
          value={userName || ""}
          onChange={(e) => handleChangeUserName(e)}
          required
          className="bg-slate-100 p-2 mr-2"
        />
        <input
          placeholder="Enter age"
          type="number"
          name="age"
          value={userCity || ""}
          onChange={(e) => handleChangeUserCity(e)}
          required
          className="bg-slate-100 p-2 mr-2"
        />
        <button
          className="bg-sky-400 text-white px-4 rounded"
          onClick={() => handleUpdateUser()}
        >
          Add user
        </button>
      </header>
      <article className="container mx-auto mt-4">
        <ul type="none" className="max-w-fit mx-auto">
          {users.map((u, i) => (
            <li key={i} className="flex mb-2">
              <strong className="mr-1">{u.name}: </strong> {u.address?.city}{" "}
              <h5
                className="border rounded px-1 cursor-pointer ml-4"
                onClick={() => handleRemove(u)}
              >
                Remove
              </h5>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default App;
