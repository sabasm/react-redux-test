import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as taskActions from "../../actions/tasksActions";

const AddTask = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { editUId, taskId } = params;

  const {
    tasks,
    addTask,
    handleFormChanges,
    setEditTaskData,
    postNewTask,
    updateTask,
    error,
    loading,
    goBack,
  } = props;
  let { userId, taskTitle: title } = addTask;
  const disabled = !title || !userId || error || loading;

  useEffect(() => {
    if (Object.keys(tasks).length && editUId && taskId) {
      let editTask = tasks[editUId][taskId];
      editTask.taskTitle = editTask.title;
      setEditTaskData(editTask);
    } else {
      !Object.keys(tasks).length &&
        editUId &&
        taskId &&
        navigate(`/tasks/addTask`);
    }
    return () => {
      setEditTaskData({
        completed: false,
        id: "",
        taskTitle: "",
        title: "",
        userId: "",
      });
    };
  }, [tasks, editUId, taskId, navigate, setEditTaskData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newTask = {
      ...addTask,
      title,
    };
    delete newTask.taskTitle;
    // console.log("newTask = ", newTask);
    if (taskId) {
      await updateTask(newTask);
    } else {
      await postNewTask(newTask);
    }
  };

  useEffect(() => {
    goBack && navigate(`/tasks`);
  }, [goBack, navigate]);

  // useEffect(() => {
  //   console.log("props = ", props);
  // }, [props]);

  return (
    <div>
      <h1>{taskId ? "Editar tarea" : "Agregar tarea nueva"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">
          Usuario id:
          <input
            name="userId"
            id="userId"
            type="number"
            value={userId}
            placeholder="ID del usuario"
            onChange={(e) => handleFormChanges(e)}
            disabled={editUId}
          />
        </label>
        <br />
        <label htmlFor="taskTitle">
          Titulo de la tarea:
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            value={title}
            placeholder="Titulo de la tarea"
            onChange={(e) => handleFormChanges(e)}
          ></input>
        </label>
        <br />
        <button disabled={disabled}>
          {loading ? "Cargando" : taskId ? "Guardar" : "Agregar"}
        </button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, taskActions)(AddTask);
