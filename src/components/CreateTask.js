import React, { useState } from "react";
import { fetchTasks, createTasks } from "../redux";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTask() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [mainTask, setMainTask] = useState({
    taskName: "",
    priority: "",
    assigned_to: "",
    due_date: moment().format("YYYY-MM-DDTHH:mm")
  });

  const handleCreateTask = async () => {
    if (!mainTask.taskName || !mainTask.priority || !mainTask.due_date) {
      toast.warn("Mandatory fields are required to fill.");
      return false;
    }
    let taskDetail = new FormData();
    taskDetail.append("message", mainTask.taskName);
    taskDetail.append("priority", mainTask.priority);
    taskDetail.append("assigned_to", mainTask.assigned_to);
    taskDetail.append(
      "due_date",
      moment(mainTask.due_date).format("YYYY-MM-DD HH:mm:ss")
    );
    document.getElementById("overlay").style.display = "block";
    await dispatch(createTasks(taskDetail));
    await dispatch(fetchTasks());
    document.getElementById("overlay").style.display = "none";
    toast.success("Task Successfully created.");
    setMainTask({
      taskName: "",
      priority: "",
      due_date: moment().format("YYYY-MM-DDTHH:mm")
    });
  };

  return (
    <div>
      <div className="row  p-2">
        <div className="col-sm-6">
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task name"
              value={mainTask.taskName}
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
                defaultValue="0"
                onChange={(e) =>
                  setMainTask({
                    ...mainTask,
                    priority: e.target.value
                  })
                }
              >
                <option value="0">Select</option>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Assign To</label>
            <select
              className="form-control"
              defaultValue=""
              onChange={(e) =>
                setMainTask({
                  ...mainTask,
                  assigned_to: e.target.value
                })
              }
            >
              <option value="">Select</option>

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
              defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
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
            onClick={() => handleCreateTask()}
          >
            Create
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateTask;
