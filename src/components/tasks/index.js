import { useEffect } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";

const Tasks = (props) => {
  const { tasksReducer, getTasks } = props;

  useEffect(() => {
    async function fetchData() {
      await getTasks();
    }
    fetchData();
  }, [getTasks]);

  //   useEffect(() => {
  //     console.log(tasksReducer.tasks);
  //   }, [tasksReducer]);
  useEffect(() => {
    console.log("props = ", props);
  }, [props]);

  const tasksByUserId = (userId) => {
    const { tasks } = props.tasksReducer;
    const byUserId = {
      ...tasks[userId],
    };
    return Object.keys(byUserId).map((taskId) => (
      <div key={taskId}>
        <input
          type="checkbox"
          defaultChecked={byUserId[taskId].completed}
        ></input>
        <span>{byUserId[taskId].title}</span>
      </div>
    ));
  };

  const showContent = () => {
    const { tasks, loading, error } = tasksReducer;
    if (error) {
      return <p>{error}</p>;
    }
    if (loading) {
      return <p>Cargando...</p>;
    }
    return Object.keys(tasks).map((userId) => (
      <div key={userId}>
        <h2>user id {userId}</h2>
        <div>{tasksByUserId(userId)}</div>
      </div>
    ));
  };

  return <div>{showContent()}</div>;
};

const mapStateToProps = ({ tasksReducer }) => {
  return { tasksReducer };
};

export default connect(mapStateToProps, tasksActions)(Tasks);
