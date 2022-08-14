import React, { useEffect } from "react";
import { AddUser, RemoveUser } from "./redux/action";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const App = () => {
  const [userName, setUserName] = React.useState();
  const [userAge, setUserAge] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state?.userReducer);
  let users = userStore?.users?.sort((a, b) => b.id - a.id);
  const handleUpdateUser = () => {
    if (!userName || !userAge) {
      if (!userName) {
        let message = {
          type: "Error",
          Errors: ["Name is required"]
        };
        let msgs = [...messages, message];
        setMessages(msgs);
      }
    } else {
      // let lastId = users?.[0]?.id || 0;
      const userData = {
        id: v4(),
        name: userName,
        age: userAge
      };
      dispatch(AddUser(userData));
    }
  };
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeUserAge = (e) => {
    setUserAge(e.target.value);
  };
  const handleRemove = (user) => {
    const isConfirm = window.confirm("Are you sure?");
    if (isConfirm) {
      //console.log(user);
      dispatch(RemoveUser(user));
    }
  };

  useEffect(() => {
    setUserName(null);
    setUserAge(null);
    console.log(users);
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
          value={userAge || ""}
          onChange={(e) => handleChangeUserAge(e)}
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
              <strong className="mr-1">{u.name}: </strong> {u.age}{" "}
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
