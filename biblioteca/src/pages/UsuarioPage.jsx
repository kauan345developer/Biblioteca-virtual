import styles from "./usuarios.module.scss";
import img from "../assets/users/user2.png"

function UsuarioPage() {


  
  return (
    <div className={styles.container}>
      <div className={styles.userBookShelf}>
        <div className={styles.userIMG}>
          <img src={img} alt="" />
        </div>
        <span>Meus Livros</span>
        <div className={styles.bookShelf}>

        </div>
        <button>Sair</button>
      </div>
    </div>
  );
}

export { UsuarioPage };
