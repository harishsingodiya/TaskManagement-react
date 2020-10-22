import axios from "axios";
import { TASK_REQUEST, TASK_SUCCESS, TASK_ERROR } from "./taskType";

export const fetchTasksRequest = () => {
  return {
    type: TASK_REQUEST
  };
};
const fetchTasksSuccess = (tasks) => {
  return {
    type: TASK_SUCCESS,
    payload: tasks
  };
};
const fetchTasksFailure = (error) => {
  return {
    type: TASK_ERROR,
    payload: error
  };
};

export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .get("https://devza.com/tests/tasks/list", {
        headers: {
          AuthToken: "U0QPhQReDsnJmidL941N1wzNN77KPvHL"
        }
      })
      .then((res) => {
        const tasks = res.data.tasks;
        dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

export const createTasks = (taskData) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("https://devza.com/tests/tasks/create", taskData, {
        headers: {
          AuthToken: "U0QPhQReDsnJmidL941N1wzNN77KPvHL"
        }
      })
      .then((res) => {
        const tasks = res.data.tasks;
        dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

export const deleteTask = (taskData) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("https://devza.com/tests/tasks/delete", taskData, {
        headers: {
          AuthToken: "U0QPhQReDsnJmidL941N1wzNN77KPvHL"
        }
      })
      .then((res) => {
        //const tasks = res.data.tasks;
        //dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

export const updateTaskPriority = (taskData) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("https://devza.com/tests/tasks/update", taskData, {
        headers: {
          AuthToken: "U0QPhQReDsnJmidL941N1wzNN77KPvHL"
        }
      })
      .then((res) => {
        //const tasks = res.data.tasks;
        //dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

export const updateTask = (taskData) => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest);
    await axios
      .post("https://devza.com/tests/tasks/update", taskData, {
        headers: {
          AuthToken: "U0QPhQReDsnJmidL941N1wzNN77KPvHL"
        }
      })
      .then((res) => {
        //const tasks = res.data.tasks;
        //dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};
