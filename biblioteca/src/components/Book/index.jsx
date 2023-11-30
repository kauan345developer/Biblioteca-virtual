/* eslint-disable react/prop-types */
// import heart from "../../assets/icons/heart.svg"
// import { Stars } from "./stars"
import { addBookToUser,userToken,userHasBook,isLogged } from "../../apis/api.js";
import styles from "./styles.module.scss"
import { useState,useEffect, } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

function Book(props){

  const [hasBook, setHasBook] = useState([])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("account"));
    // console.log(token);
    const fetchData = async () => {
      const usuarioID = (await userToken(token)).token;
      console.log(usuarioID)
      try {
        const response = await userHasBook(usuarioID.usuarioId,props.bookID);
        console.log(await userHasBook(usuarioID.usuarioId,props.bookID));
        setHasBook(response);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchData();
  }, [props.bookID]);


  const [loged, setLoged] = useState(false)

  useEffect(() => {

    const token =JSON.parse(localStorage.getItem("account"))
    console.log(token)

    const fetchData = async () => {
      try {
        const response = await isLogged(token);
        console.log( await isLogged( token))
        setLoged(response);
      } catch (error) {
        console.error('Erro no login:', error);
      }
    };
  
    fetchData();
  }, []);

  

  const navigate = useNavigate()
  const handleClick = async () => {
    const token =JSON.parse(localStorage.getItem("account"))
    console.log(token)

    if(hasBook.loggedIn){
      return navigate("reading")
    }


     if(!loged){
        return navigate("/login")
     }

    try {
      const usuarioID = await userToken(token)
      console.log(usuarioID.token.usuarioId)
      console.log(props.bookID)
      const response = await addBookToUser( props.bookID ,usuarioID.token.usuarioId);
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
          <button className={styles.btnBuy} onClick={handleClick}>{hasBook.loggedIn ? 'Ler' : 'Comprar'}</button>
          
        </div>
      </div>
    </div>
  )
}


export {Book}