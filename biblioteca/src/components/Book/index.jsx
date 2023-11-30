/* eslint-disable react/prop-types */
// import heart from "../../assets/icons/heart.svg"
// import { Stars } from "./stars"
import { addBookToUser,userToken } from "../../apis/api.js";
import styles from "./styles.module.scss"
// import { useLocation } from "react-router-dom";

function Book(props){

  const handleClick = async () => {
    const token =JSON.parse(localStorage.getItem("account"))
    console.log(token)

    // eslint-disable-next-line react-hooks/rules-of-hooks

    try {
      const usuarioID = await userToken(token)
      console.log(usuarioID.usuarioId)
      console.log(props.bookID)
      const response = await addBookToUser( props.bookID ,usuarioID.usuarioId);
      console.log(response);
      // Adicione aqui a lógica que você quer que seja executada após a adição do livro
    } catch (error) {
      console.error('Erro ao adicionar o livro:', error);
    }
  };

  return(
    <div className={styles.container}>
      <div className={styles.displayBook}>
        <div className={styles.bookImage}>
          <img src={props.imgBook} alt="" />
        </div>
        <div className={styles.bookDetails}>
          <h2 className={styles.booktitle}>{props.title}</h2>
          <h4>{props.authors}</h4>
          <p className={styles.bookDescription}>{props.description}</p>
          <button className={styles.btnBuy} onClick={handleClick}>comprar</button>
          
        </div>
      </div>
    </div>
  )
}


export {Book}