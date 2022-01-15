import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import Tabla from "./Tabla";

class Users extends Component {
  async componentDidMount() {
    if (!this.props.usuarios.length) {
      this.props.traerTodos();
    }
  }

  ponerContenido = () => {
    if (this.props.loading) {
      return <p>Cargando...</p>;
    }
    if (this.props.error) {
      return <p>{this.props.error}</p>;
    }
    return <Tabla />;
    // return this.ponerFilas();
  };

  render() {
    return <div>{this.ponerContenido()}</div>;
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Users);
