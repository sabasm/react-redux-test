import axios from "axios";
import { LOADING, TRAER_TODOS, ERROR } from "../types/usersTypes";
export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
      );
      console.info("usuarios actions traerTodos axios called");
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
