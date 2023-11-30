import styles from "./usuarios.module.scss";
import img from "../assets/users/user2.png";
import { userBookShelf, userToken } from "../apis/api.js";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function UsuarioPage() {
  const [bookItems, setBookItems] = useState([]);

  const history = useNavigate();

  const clearLocalStorage = () => {
    localStorage.clear();
    history("/");
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("account"));
    // console.log(token);
    const fetchData = async () => {
      const usuarioID = await userToken(token);
      if (usuarioID.isAdmin) {
        history("/admin");
      }
      try {
        const response = await userBookShelf(usuarioID.token.usuarioId);
        console.log(await userBookShelf(usuarioID.token.usuarioId));
        setBookItems(response);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchData();
  }, []);

  console.log(bookItems);

  return (
    <div className={styles.container}>
      <div className={styles.userBookShelf}>
        <div className={styles.userIMG}>
          <img src={img} alt="" />
        </div>
        <span>Meus Livros</span>
        <div className={styles.bookShelf}>
          {bookItems.map((book) => {
            const MeuComponente = () => {
              const [caminhoDaImagem, setCaminhoDaImagem] = useState(null);

              useEffect(() => {
                import(
                  `../../../biblioteca-server/public/livros/capas/${book.id}.png`
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
                key={book.id}
                style={{ textDecoration: "none" }}
                to={`/book/${book.id}`}
              >
                <div>
                  <MeuComponente />
                  <p>{book.titulo}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/">
          <button onClick={clearLocalStorage}>Sair</button>
        </Link>
      </div>
    </div>
  );
}

export { UsuarioPage };
