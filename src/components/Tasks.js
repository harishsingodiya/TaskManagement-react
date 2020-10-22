/*
This component shows a list of all tasks along with their sub task
*/
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, fetchTasks } from "../redux";
import CreateTask from "./CreateTask";
import TaskUpdate from "./TaskUpdate";
import AllTasks from "./AllTasks";

function Tasks() {
  const userData = useSelector((state) => state.user);
  const taskData = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [task, setTask] = useState({});

  const initialsLoad = async () => {
    document.getElementById("overlay").style.display = "block";
    await dispatch(fetchTasks());
    await dispatch(fetchUsers());
    document.getElementById("overlay").style.display = "none";
  };

  useEffect(() => {
    initialsLoad();
  }, []);

  const updateTaskClick = useCallback(
    (task) => {
      setTask(task);
      document.getElementById("pills-assign-tab").click();
    },
    [setTask]
  );
  return (
    <div className="container-fluid">
      <div className="row p-2">
        <div className="col-sm-12 text-left">
          <div className="card">
            <div className="card-body">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-task-tab"
                    data-toggle="pill"
                    href="#all-task-tab"
                    role="tab"
                    aria-controls="pills-task"
                    aria-selected="true"
                  >
                    Team Tasks
                  </a>
                </li>
                <li className="nav-item d-none">
                  <a
                    className="nav-link"
                    id="pills-assign-tab"
                    data-toggle="pill"
                    href="#assign-task-tab"
                    role="tab"
                    aria-controls="pills-assign"
                    aria-selected="false"
                  >
                    User Task Assignment
                  </a>
                </li>

                <i className="flex flex-fill" />
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pill-task-tab"
                    data-toggle="pill"
                    href="#create-task-tab"
                    role="tab"
                    aria-controls="pills-task"
                    aria-selected="false"
                  >
                    Create Task
                  </a>
                </li>
              </ul>
              <div className="card">
                <div className="card-body">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="all-task-tab"
                      role="tabpanel"
                      aria-labelledby="pills-task-tab"
                    >
                      <AllTasks updateTaskClick={updateTaskClick} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="assign-task-tab"
                      role="tabpanel"
                      aria-labelledby="pills-assign-tab"
                    >
                      <TaskUpdate task={task} />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="create-task-tab"
                      role="tabpanel"
                      aria-labelledby="pills-task-tab"
                    >
                      <CreateTask />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
