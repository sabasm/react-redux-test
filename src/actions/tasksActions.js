import axios from "axios";
import {
  LOADING,
  GET_TASKS,
  UPDATE_TASKS,
  ERROR,
  FORM_CHANGES,
  GO_BACK,
} from "../types/tasksTypes";

export const getTasks = () => async (dispatch) => {
  //  console.group("tasksActions / getTasks");
  dispatch({
    type: LOADING,
  });
  // console.log("tasks actions getTasks axios called");
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tasks = {};
    respuesta.data.map(
      (task) =>
        (tasks[task.userId] = {
          ...tasks[task.userId],
          [task.id]: {
            ...task,
          },
        })
    );

    dispatch({
      type: GET_TASKS,
      payload: tasks,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible",
    });
  }
  //  console.groupEnd();
};

export const handleFormChanges = (e) => (dispatch, getState) => {
  // console.group("tasksActions / handleFormChanges");
  // console.log("form changes", e.target.name, e.target.value);
  // console.log("getState = ", getState().tasksReducer.addTask);
  const updateAddTaskData = {
    ...getState().tasksReducer.addTask,
    [e.target.name]: e.target.value,
  };
  dispatch({
    type: ERROR,
    payload: "",
  });
  dispatch({
    type: FORM_CHANGES,
    payload: updateAddTaskData,
  });
  // console.groupEnd();
};

export const postNewTask = (task) => async (dispatch, getState) => {
  // console.group("tasksActions / postNewTask");
  // console.log("postNewTask task = ", task);
  dispatch({
    type: LOADING,
  });
  // console.log("tasks actions postNewTask axios called");
  try {
    await axios.post("https://jsonplaceholder.typicode.com/todos", task);
    dispatch({
      type: GO_BACK,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Intente más tarde",
    });
  }
  // console.groupEnd();
};

export const setEditTaskData = (task) => (dispatch) => {
  // console.log(task);
  dispatch({
    type: ERROR,
    payload: "",
  });
  dispatch({
    type: FORM_CHANGES,
    payload: task,
  });
};

export const updateTask = (task) => async (dispatch, getState) => {
  // console.group("tasksActions / updateTask");
  // console.log("updateTask task = ", task);
  dispatch({
    type: LOADING,
  });
  // console.log("tasks actions updateTask axios called");
  try {
    await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${task.id}`,
      task
    );
    dispatch({
      type: GO_BACK,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Intente más tarde",
    });
  }
  // console.groupEnd();
};

export const toogleToDo = (userId, taskId) => (dispatch, getState) => {
  const { tasks } = getState().tasksReducer;
  const task = tasks[userId][taskId];

  const updatedTasks = {
    ...tasks,
  };
  updatedTasks[userId] = {
    ...tasks[userId],
  };

  updatedTasks[userId][taskId] = {
    ...task,
    completed: !task.completed,
  };
  dispatch({
    type: UPDATE_TASKS,
    payload: updatedTasks,
  });
};

export const deleteTask = (task) => async (dispatch, getState) => {
  // console.log("deleteTask task = ", task);
  dispatch({
    type: LOADING,
  });
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${task.id}`);
    dispatch({
      type: GET_TASKS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Intente más tarde",
    });
  }
};
