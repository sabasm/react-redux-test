import { useEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import * as tasksActions from "../../actions/tasksActions";

const Tasks = (props) => {
  const { tasksReducer, getTasks, toogleToDo, deleteTask: _deleteTask } = props;
  const { tasks, loading, error } = tasksReducer;

  const toggleTask = (userId, taskId) => {
    toogleToDo(userId, taskId);
  };
  const deleteTask = (payload) => {
    _deleteTask(payload);
  };

  useEffect(() => {
    if (!Object.keys(tasks).length) {
      async function fetchData() {
        await getTasks();
      }
      fetchData();
    }
  }, [getTasks, tasks]);

  // useEffect(() => {
  //   console.log(tasksReducer.tasks);
  // }, [tasksReducer]);
  // useEffect(() => {
  //   console.log("props = ", props);
  // }, [props]);

  const tasksByUserId = (userId) => {
    const byUserId = {
      ...tasks[userId],
    };
    return Object.keys(byUserId).map((taskId) => (
      <div key={taskId} className="tasks_task">
        <input
          type="checkbox"
          defaultChecked={byUserId[taskId].completed}
          onChange={() => toggleTask(userId, taskId)}
        ></input>
        <span>{byUserId[taskId].title}</span>
        <button type="button" name="EDIT">
          <Link to={`addTask/${userId}/${taskId}`}>Editar</Link>
        </button>
        <button
          type="button"
          name="DELETE"
          onClick={() => deleteTask({ userId, taskId })}
        >
          Eliminar
        </button>
      </div>
    ));
  };

  const showContent = () => {
    if (error) {
      return <p>{error}</p>;
    }
    if (loading) {
      return <p>Cargando...</p>;
    }
    return Object.keys(tasks).map((userId) => (
      <div key={userId} className="tasks">
        <h2>user id {userId}</h2>
        <div>{tasksByUserId(userId)}</div>
      </div>
    ));
  };

  return (
    <div>
      <Link to="/tasks/addTask">Agregar tarea</Link>
      {showContent()}
    </div>
  );
};

const mapStateToProps = ({ tasksReducer }) => {
  return { tasksReducer };
};

export default connect(mapStateToProps, tasksActions)(Tasks);
