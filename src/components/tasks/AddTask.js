import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as taskActions from "../../actions/tasksActions";

const AddTask = (props) => {
  const { addTask, handleFormChanges, postNewTask, error, loading, goBack } =
    props;
  const { userId, taskTitle: title } = addTask;
  const disabled = !title || !userId || error || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newTask = {
      ...addTask,
      title,
    };
    delete newTask.taskTitle;
    await postNewTask(newTask);
  };

  const navigate = useNavigate();

  useEffect(() => {
    goBack && navigate(`/tasks`);
  }, [goBack, navigate]);

  return (
    <div>
      <h1>Agregar tarea nueva</h1>
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
          {loading ? "Cargando" : "Agregar"}
        </button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, taskActions)(AddTask);
