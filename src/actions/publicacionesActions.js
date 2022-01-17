import axios from "axios";
import {
  LOADING,
  ACTUALIZAR,
  ERROR,
  COM_ACTUALIZAR,
  COM_LOADING,
  COM_ERROR,
} from "../types/postsTypes";
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
      type: ACTUALIZAR,
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
    const respuesta = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/?userId=${usuario_id}`
    );
    console.info("publicaciones actions traerPorId axios called");

    const nuevas = respuesta.data.map((publicacion) => ({
      ...publicacion,
      comentarios: [],
      abierto: false,
    }));

    const publicaciones_actualizadas = [...publicaciones, nuevas];

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key,
    };
    dispatch({
      type: ACTUALIZAR,
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

export const abrirCerrar = (postsKey, com_key) => (dispatch, getState) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[postsKey][com_key];
  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto,
  };
  const publicaciones_actualizadas = [...publicaciones];
  publicaciones_actualizadas[postsKey] = [...publicaciones[postsKey]];
  publicaciones_actualizadas[postsKey][com_key] = actualizada;

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas,
  });
};

export const traerComentarios =
  (postsKey, com_key) => async (dispatch, getState) => {
    dispatch({
      type: COM_LOADING,
    });
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[postsKey][com_key];
    try {
      const respuesta = await axios.get(
        "https://jsonplaceholder.typicode.com/comments?postId=" +
          seleccionada.id
      );
      console.info("traerComentarios axios called");
      const actualizada = {
        ...seleccionada,
        comentarios: respuesta.data,
      };
      const publicaciones_actualizadas = [...publicaciones];
      publicaciones_actualizadas[postsKey] = [...publicaciones[postsKey]];
      publicaciones_actualizadas[postsKey][com_key] = actualizada;

      dispatch({
        type: COM_ACTUALIZAR,
        payload: publicaciones_actualizadas,
      });
    } catch (error) {
      dispatch({
        type: COM_ERROR,
        payload: "No se pudieron obtener los comentarios",
      });
    }
  };
