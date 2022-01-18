import axios from "axios";
import { LOADING, GET_TASKS, ERROR } from "../types/tasksTypes";
console.group("tasksActions.js");
export const getTasks = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.info("tasks actions getTasks axios called");

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
};
console.groupEnd();
