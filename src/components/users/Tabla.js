import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Tabla = (props) => {
  const ponerFilas = () =>
    props.usuarios.map((usuario,key) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.website}</td>
        <td>{usuario.email}</td>
        <td>
          <Link to={`/posts/${key}`}> ver </Link>
        </td>
      </tr>
    ));

  return (
    <div>
      <h1>Usuarios</h1>
      <table className="tabla">
        <thead>
          <tr>
            <th>nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>{ponerFilas()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps)(Tabla);
