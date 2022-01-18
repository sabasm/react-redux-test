import {
  GET_TASKS,
  LOADING,
  ERROR,
  FORM_CHANGES,
  GO_BACK,
} from "../types/tasksTypes.js";

const initialState = {
  tasks: {},
  loading: false,
  error: "",
  addTask: {
    completed: false,
    userId: "",
    taskTitle: "",
  },
  goBack: false,
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: "",
        goBack: false,
      };
    case FORM_CHANGES:
      return {
        ...state,
        addTask: action.payload,
        loading: false,
        error: "",
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        goBack: false,
      };
    case GO_BACK:
      return {
        ...state,
        error: "",
        addTask: initialState.addTask,
        loading: false,
        goBack: true,
      };

    default:
      return state;
  }
}
