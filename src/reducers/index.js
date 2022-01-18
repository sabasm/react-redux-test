import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import publicacionesReducer from "./publicacionesReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  usuariosReducer,
  publicacionesReducer,
  tasksReducer,
});
