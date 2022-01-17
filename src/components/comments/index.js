import { connect } from "react-redux";

const Comments = (props) => {
  let {
    comments,
    com_loading: commentsLoading,
    com_error: commentsError,
  } = props;

  const renderComments = () => {
    if (commentsError) {
      return <p>{commentsError}</p>;
    }
    if (commentsLoading || !comments.length) {
      return <p>Cargando...</p>;
    }
    return comments.map((comment, index) => {
      return (
        <li key={index}>
          <div>
            <span>Comentario de {comment.name}</span>
            <br />
            <span>
              {">> "}
              <br />
              {comment.body}
            </span>
          </div>
        </li>
      );
    });
  };

  return <ul>{renderComments()}</ul>;
};
const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comments);
