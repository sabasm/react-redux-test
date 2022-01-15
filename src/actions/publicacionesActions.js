import axios from "axios";
import { LOADING, TRAER_POR_USUARIO, ERROR } from "../types/postsTypes";
import * as usuariosTypes from "../types/usersTypes";
const { TRAER_TODOS: USERS_TRAER_TODOS } = usuariosTypes;

export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({
      type: TRAER_POR_USUARIO,
      payload: respuesta.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Error en la conexion",
    });
  }
};

export const traerPorId = (key) => async (dispatch, getState) => {
  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  dispatch({
    type: LOADING,
  });

  try {
    console.info("publicaciones actions traerPorId axios called");
    const respuesta = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/?userId=${usuario_id}`
    );
    const publicaciones_actualizadas = [...publicaciones, respuesta.data];

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key,
    };
    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicaciones_actualizadas,
    });

    dispatch({
      type: USERS_TRAER_TODOS,
      payload: usuarios_actualizados,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "No se pudieron obtener las publicaciones",
    });
  }
};
