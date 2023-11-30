/* eslint-disable no-unused-vars */
import logo from "../../assets/logoBiblioteca.png";
import styles from "./styles.module.scss";
import searchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchByName,isLogged } from "../../apis/api.js";
import userIcon from "../../assets/icons/user.svg"
// import "../../../../biblioteca-server/public/livros/capas"
function Header() {


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


  const [valorDoCampo, setValorDoCampo] = useState("");

  const handleInputChange = (event) => {
    const inputBook = document.getElementById("searchD");
    if (inputBook) {
      inputBook.style.display = "flex";
    }
    setValorDoCampo(event.target.value);
    console.log(valorDoCampo);
  };

  const handleBlur = () => {
    const inputBook = document.getElementById("searchD");
    if (inputBook) {
      setTimeout(() => {
        inputBook.style.display = "none";
      }, 100);
    }
  };

  const [bookItems, setBookItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (valorDoCampo) {
        try {
          console.log(valorDoCampo + "11111");
          const response = await searchByName(valorDoCampo);
          console.log(await searchByName(valorDoCampo));
          setBookItems(response);
        } catch (error) {
          console.error("Erro ao buscar os livros:", error);
        }
      } else {
        const inputBook = document.getElementById("searchD");
        if (inputBook) {
          inputBook.style.display = "none";
        }
      }
    };

    fetchData();
  }, [valorDoCampo]);

  return (
    <div className={styles.container}>
      <Link to="/">
        <img src={logo} alt="" className={styles.logo} />
      </Link>
      <div className={styles.search}>
        <input
          type="text"
          value={valorDoCampo}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <div className={styles.searchBooks} id="searchD">
          {bookItems.map((book) => {
            const MeuComponente = () => {
              const [caminhoDaImagem, setCaminhoDaImagem] = useState(null);

              useEffect(() => {
                import(
                  `../../../../biblioteca-server/public/livros/capas/${book.id}.png`
                )
                  .then((image) => {
                    setCaminhoDaImagem(image.default);
                  })
                  .catch((error) => {
                    console.error(`Error loading image: ${error}`);
                  });
              });

              if (!caminhoDaImagem) {
                return null; // or return a placeholder image
              }

              return <img src={caminhoDaImagem} alt="Descrição da imagem" />;
            };

            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/book/${book.id}`}
                key={book.id}
              >
                <div>
                  <MeuComponente />
                  <p>{book.titulo}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <button>
          {" "}
          <img src={searchIcon} alt="" />
        </button>
      </div>

      {loged ? (
        <div>
          <Link to="usuario">
            <img src={userIcon} alt="" />
          </Link>
        </div>
      ) : (
        <div id="loginBtn">
          <Link to="login">
            <button className={styles.loginButton}>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export { Header };
