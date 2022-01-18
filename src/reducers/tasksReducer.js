import { GET_TASKS, LOADING, ERROR } from "../types/tasksTypes.js";

const initialState = {
  tasks: {},
  loading: false,
  error: ""
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
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
