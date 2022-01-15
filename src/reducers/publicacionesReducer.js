import { TRAER_POR_USUARIO, LOADING, ERROR } from "../types/postsTypes";

const initialState = {
  publicaciones: [],
  loading: false,
  error: "",
};

export default function publicacionesReducer(state = initialState, action) {
  switch (action.type) {
    case TRAER_POR_USUARIO:
      return {
        ...state,
        publicaciones: action.payload,
        loading: false,
        error: "",
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
