import axios from "axios";
import {
  LOADING,
  GET_TASKS,
  ERROR,
  FORM_CHANGES,
  GO_BACK,
} from "../types/tasksTypes";

export const getTasks = () => async (dispatch) => {
  console.group("tasksActions / getTasks");
  dispatch({
    type: LOADING,
  });
  console.log("tasks actions getTasks axios called");
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
  console.groupEnd();
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
