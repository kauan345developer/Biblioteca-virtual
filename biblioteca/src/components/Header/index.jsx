import logo from "../../assets/logoBiblioteca.png";
import styles from "./styles.module.scss";
import searchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchByName } from "../../apis/api";
// import "../../../../biblioteca-server/public/livros/capas"
function Header() {
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
      inputBook.style.display = "none";
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
      <Link to="login">
        <button className={styles.loginButton}>Login</button>
      </Link>
    </div>
  );
}

export { Header };
