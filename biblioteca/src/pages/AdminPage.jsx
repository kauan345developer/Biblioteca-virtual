// import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import user from '../assets/users/user1.png'; // Substitua pelo caminho correto da imagem
import styles from './admin.module.scss'; // Importe os estilos SCSS Modules

function Admin() {
  return (
    <div className={styles.container}>
      <div className = {styles.containerAdmin}>
        <div className={styles.adminPanel}>
          <div>
            <img src={user} alt="" />
          </div>
          <span>Nome</span>
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

export  {Admin};
