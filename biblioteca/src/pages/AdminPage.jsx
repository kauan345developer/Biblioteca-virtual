// import React from 'react';
import { useNavigate, Link, Outlet } from "react-router-dom";
import user from "../assets/users/user1.png"; // Substitua pelo caminho correto da imagem
import styles from "./admin.module.scss"; // Importe os estilos SCSS Modules
import { userToken } from "../apis/api.js";

function Admin() {
  const token = JSON.parse(localStorage.getItem("account"));

  let usuarioID = {};
  async function fetchData() {
    const history = useNavigate();
    usuarioID = await userToken(token);
    if (!usuarioID.isAdmin) {
      history("/");
    }
    try {
    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
    }
  };

  fetchData();

  return (
    <div className={styles.container}>
      <div className={styles.containerAdmin}>
        <div className={styles.adminPanel}>
          <div>
            <img src={user} alt="" />
          </div>
          <span>{usuarioID.name}</span>
          <nav>
            <Link to="">
              <span>Create BooK</span>
            </Link>
            <Link to="del">
              <span>Delete BooK</span>
            </Link>
            <Link to="view">
              <span>View BooK</span>
            </Link>
            <Link to="bookshelf">
              <span>Book Shelf</span>
            </Link>
          </nav>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export { Admin };
