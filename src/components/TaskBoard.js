import React from "react";
import { useDispatch } from "react-redux";
import Task from "./Task";
import { fetchTasks, updateTaskPriority } from "../redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskBoard(props) {
  const dispatch = useDispatch();
  const handleDragOverOnBoard = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    var priorityTo = e.target.getAttribute("data-boardplaceholder");
    var taskId = e.dataTransfer.getData("taskId", e.target.taskId);
    let taskData = new FormData();
    taskData.append("taskid", taskId);
    taskData.append("priority", priorityTo);
    document.getElementById("overlay").style.display = "block";
    await dispatch(updateTaskPriority(taskData));
    await dispatch(fetchTasks());
    document.getElementById("overlay").style.display = "none";
    toast.success("Task priority Successfully updated.");
  };
  return (
    <div
      className="col-sm-4 p-2"
      onDrop={handleDrop}
      onDragOver={handleDragOverOnBoard}
    >
      <div id={props.id} className="card m-0">
        <div className="card-header">
          <h5>{props.title}</h5>
        </div>
        <div className="card-body">
          <Task
            priority={props.priority}
            updateTaskClick={props.updateTaskClick}
          />
        </div>
        <div
          className="card-footer bg-white p-4"
          data-boardplaceholder={props.priority}
        >
          <h5 className="bg-light" data-boardplaceholder={props.priority}>
            {" "}
            Add a task...
          </h5>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TaskBoard;
