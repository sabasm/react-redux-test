import axios from "axios";
import { LOADING, TRAER_TODOS, ERROR } from "../types/usersTypes";
export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    console.log("usuarios actions traerTodos axios called");
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Información de usuario no disponible",
    });
  }
};
