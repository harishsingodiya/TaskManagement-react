import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "../redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Task(props) {
  const taskData = useSelector((state) => state.task);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", e.target.getAttribute("data-taskid"));
  };

  const handleDeleteTask = async (taskId) => {
    let taskData = new FormData();
    taskData.append("taskid", taskId);
    document.getElementById("overlay").style.display = "block";
    await dispatch(deleteTask(taskData));
    await dispatch(fetchTasks());
    document.getElementById("overlay").style.display = "none";
    toast.success("Task Successfully deleted.");
  };

  return (
    <div>
      {taskData && taskData.tasks
        ? taskData.tasks.map((task) =>
            task.priority === props.priority ? (
              <div
                key={task.id}
                data-taskid={task.id}
                id={props.priority}
                className="card mt-1 bg-light"
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
              >
                <div className="card-header bg-white d-flex">
                  <i className="flex flex-fill" />
                  <span className="dropleft w-auto">
                    <i
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></i>

                    <span className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        onClick={() => props.updateTaskClick(task)}
                      >
                        Edit
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </li>
                    </span>
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title w-auto">{task.message}</h5>
                </div>
                <div className="d-flex p-2 align-items-end">
                  <small>
                    {moment(task.due_date).format("DD MMM YYYY hh:mm:ss a")}
                  </small>
                  <i className="flex flex-fill" />

                  <span className="rounded-circle">
                    {userData &&
                      userData.users &&
                      userData.users
                        .filter((user) => user.id === task.assigned_to)
                        .map((filteredUser) => (
                          <img
                            key={filteredUser.id}
                            src={filteredUser.picture}
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                            alt="Cinque Terre"
                          ></img>
                        ))}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )
          )
        : ""}
      <ToastContainer />
    </div>
  );
}

export default Task;
