import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  completeTask,
  deleteTask,
  updateTask,
} from "./Redux ToolKit/Slices/userTask";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faTrash, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
const App = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const getData = useSelector((state) => state.userTask.tasks);
  const dispatch = useDispatch();

  // console.log(data);

  useEffect(() => {
    if (getData) {
      setData(getData);
    }
  }, [data, getData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    dispatch(addTask({ id, task: inputValue, completed: false }));

    setInputValue("");
  };

  const handleEdit = (id, task) => {
    const updatedTask = prompt(`add New Task: ${task}`);

    dispatch(updateTask({ id, updatedTask }));
  };

  const handleComplete = (id) => {
    dispatch(completeTask({ id }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask({ id }));
  };

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-y-4 bg-purple-700">
        <h1 className="text-[2rem] font-[600]">Add Your Important Task Here</h1>
        <div className="flex flex-col justify-evenly items-center border h-[70%] w-[50%]">
          <form
            className="flex justify-between items-center w-[70%] gap-2 h-[12%] rounded-[2rem] bg-zinc-200 "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Add Your Task"
              name="task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="rounded-[1rem] h-[2rem] pl-2 bg-transparent placeholder:text-black text-black outline-none w-[100%]"
              required
            />
            <button
              type="submit"
              className=" bg-orange-600 text-white font-[500] text-[18px] h-full w-[37%] rounded-[2rem]"
            >
              Add
            </button>
          </form>


          {data.length > 0 ? (
  <ul className="w-[70%] h-[40vh] overflow-y-auto gap-y-5">
    {data.map((userData) => (
      <li
        className="w-full mt-2  bg-amber-600 flex justify-evenly items-center rounded-[2rem] h-[4rem]"
        key={userData.id}
      >
        <span className="cursor-pointer" onClick={() => handleEdit(userData.id, userData.task)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
        <p className={`${userData.completed ? "line-through" : ""} overflow-hidden w-[50%] flex justify-center items-center`}>
          {userData.task}
        </p>
        {userData.completed ? (
          <span className="cursor-pointer" onClick={() => handleComplete(userData.id)}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        ) : (
          <span className="cursor-pointer" onClick={() => handleComplete(userData.id)}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
        <span className="cursor-pointer" onClick={() => handleDelete(userData.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </li>
    ))}
  </ul>
) : (
  <span className="text-white text-[2rem] w-full h-[40vh] flex justify-center items-center ">
    Start Adding Task
  </span>
)}
        </div>
      </div>
    </>
  );
};

export default App;
