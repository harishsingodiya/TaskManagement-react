import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchTasks, updateTask } from "../redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskUpdate({ task }) {
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [mainTask, setMainTask] = useState({
    taskName: "",
    priority: "",
    assigned_to: "",
    due_date: ""
  });

  /**
   * update a task
   */
  const handleUpdateTask = async () => {
    let taskDetail = new FormData();
    taskDetail.append("taskid", task.id);
    if (mainTask.taskName) taskDetail.append("message", mainTask.taskName);
    if (mainTask.priority) taskDetail.append("priority", mainTask.priority);
    if (mainTask.assigned_to)
      taskDetail.append("assigned_to", mainTask.assigned_to);
    if (mainTask.due_date)
      taskDetail.append(
        "due_date",
        moment(mainTask.due_date).format("YYYY-MM-DD HH:mm:ss")
      );
    document.getElementById("overlay").style.display = "block";
    await dispatch(updateTask(taskDetail));
    await dispatch(fetchTasks());
    document.getElementById("overlay").style.display = "none";
    toast.success("Task Successfully updated.");
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task name"
              value={
                mainTask.taskName === "" ? task.message : mainTask.taskName
              }
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  taskName: e.target.value
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <div className="input-group">
              <select
                className="form-control"
                value={
                  mainTask.priority === "" ? task.priority : mainTask.priority
                }
                onChange={(e) =>
                  setMainTask({
                    ...mainTask,
                    priority: e.target.value
                  })
                }
              >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Assigned to</label>
            <select
              className="form-control"
              value={
                mainTask.assigned_to === ""
                  ? task.assigned_to
                  : mainTask.assigned_to
              }
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  assigned_to: e.target.value
                })
              }
            >
              {userData &&
                userData.users &&
                userData.users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="datetime-local"
              min={moment().format("YYYY-MM-DDTHH:mm")}
              value={
                mainTask.due_date === ""
                  ? moment(task.due_date).format("YYYY-MM-DDTHH:mm")
                  : moment(mainTask.due_date).format("YYYY-MM-DDTHH:mm")
              }
              className="form-control"
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  due_date: e.target.value
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-sm-12 p-2 text-center">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleUpdateTask()}
          >
            Update
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TaskUpdate;
