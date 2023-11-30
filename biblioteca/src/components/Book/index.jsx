/* eslint-disable react/prop-types */
// import heart from "../../assets/icons/heart.svg"
// import { Stars } from "./stars"
import {
  addBookToUser,
  userToken,
  userHasBook,
  isLogged,
} from "../../apis/api.js";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// ... (seu código anterior)

function Book(props) {
  const [hasBook, setHasBook] = useState([]);
  const [loged, setLoged] = useState(false);
  const navigate = useNavigate();

  const fetchBook = async () => {
    const token = JSON.parse(localStorage.getItem("account"));
    if (!token) {
      return; // Retorna se não houver token
    }

    const usuarioID = (await userToken(token)).token;

    try {
      const response = await userHasBook(usuarioID.usuarioId, props.bookID);
      setHasBook(response);

      
      const btnLer = document.getElementById("btnLer");

      if (response.loggedIn) {
        btnLer.textContent = "Ler";
      }

    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
    }
  };

  useEffect(() => {
    fetchBook();
    if (!props.disponivel) {
      btnLer.innerHTML = "Indisponível";
    }
  }, []); 

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("account"));

    const fetchData = async () => {
      try {
        const response = await isLogged(token);
        setLoged(response);
      } catch (error) {
        console.error("Erro no login:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    await fetchBook();
    const token = JSON.parse(localStorage.getItem("account"));

    console.log(props)

    if (!props.disponivel) {
      return;
    }

    if (!loged) {
      console.log("não logado");
      return navigate("/login");
    }

    

    const btntxt = document.getElementById("btnLer")

    if(btntxt.textContent === "Ler"){
      navigate("reading")
    }

    try {
      console.log("a");
      const usuarioID = await userToken(token);
      console.log(usuarioID.token.usuarioId);
      console.log(props.bookID);
      const response = await addBookToUser(
        props.bookID,
        usuarioID.token.usuarioId
      );
      console.log(response);

      // Atualize o texto do botão aqui após a adição do livro
      const btnLer = document.getElementById("btnLer");
      btnLer.textContent = "Ler";

      // Adicione aqui a lógica que você quer que seja executada após a adição do livro
    } catch (error) {
      console.error("Erro ao adicionar o livro:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.displayBook}>
        <div className={styles.bookImage}>
          <img src={props.imgBook} alt="" />
        </div>
        <div className={styles.bookDetails}>
          <h2 className={styles.booktitle}>{props.title}</h2>
          <h4>{props.authors}</h4>
          <p className={styles.bookDescription}>{props.description}</p>
          <button id="btnLer" className={styles.btnBuy} onClick={handleClick}>
            {hasBook.loggedIn ? "Ler" : "Comprar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export { Book };


