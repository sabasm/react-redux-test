import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
import Comments from "../comments";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
  traerPorId: publicacionesTraerPorId,
  abrirCerrar,
  traerComentarios,
} = publicacionesActions;

const Posts = (props) => {
  let params = useParams();
  let { key } = params;

  let {
    publicaciones,
    loading: postsLoading,
    error: postsError,
  } = props.publicacionesReducer;

  let {
    usuarios,
    loading: usersLoading,
    error: usersError,
  } = props.usuariosReducer;

  let { usuariosTraerTodos, publicacionesTraerPorId } = props;

  useEffect(() => {
    if (!usuarios.length) {
      async function getAllUsers() {
        await usuariosTraerTodos();
      }
      getAllUsers();
    }
  }, [usuarios, usuariosTraerTodos]);

  useEffect(() => {
    if (usuarios.length) {
      if (!usuarios[key].hasOwnProperty("publicaciones_key")) {
        async function getPostsById(id) {
          await publicacionesTraerPorId(id);
        }
        getPostsById(key);
      }
    }
  }, [key, publicacionesTraerPorId, usuarios]);

  const handleDataForRender = () => {
    if (usersError) {
      return <p>{usersError}</p>;
    }
    if (usersLoading || !usuarios.length) {
      return <p>Cargando...</p>;
    }
    function mostrarComentarios(postKey, comKey, comments) {
      props.abrirCerrar(postKey, comKey);
      if (!comments.length) {
        props.traerComentarios(postKey, comKey);
      }
    }
    function mostrarInfo(posts, postsKey) {
      return posts.map((post, com_key) => {
        return (
          <div
            key={com_key}
            onClick={() =>
              mostrarComentarios(postsKey, com_key, post.comentarios)
            }
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {post.abierto ? (
              <Comments comments={post.comentarios} />
            ) : (
              <span>cerrado</span>
            )}
          </div>
        );
      });
    }

    function displayPosts() {
      if (postsError) {
        return <p>{postsError}</p>;
      }
      if (postsLoading) {
        return <p>Cargando...</p>;
      }
      if (!publicaciones.length) {
        return <p>Aún no cuenta con publicaciones</p>;
      }
      if (!usuarios[key].hasOwnProperty("publicaciones_key")) {
        return <span>cargando...</span>;
      }
      const { publicaciones_key } = usuarios[key];
      return mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
    }

    return (
      <div>
        <h3>Posts de {usuarios[key].name}</h3>
        {displayPosts()}
      </div>
    );
  };

  return (
    <div>
      <h1>{handleDataForRender()}</h1>
    </div>
  );
};

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorId,
  abrirCerrar,
  traerComentarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
