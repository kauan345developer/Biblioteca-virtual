import styles from "./usuarios.module.scss";
import img from "../assets/users/user2.png";
import { userBookShelf, userToken } from "../apis/api.js";
import { useEffect, useState } from "react";
import{Link} from "react-router-dom"
function UsuarioPage() {
  const [bookItems, setBookItems] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("account"));
    console.log(token);
    const fetchData = async () => {
      const usuarioID = await userToken(token);
      try {
        const response = await userBookShelf(usuarioID.usuarioId);
        console.log(await userBookShelf(usuarioID.usuarioId));
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
              <div key={book.id}>
                <MeuComponente />
                <p>{book.titulo}</p>
              </div>
            );
          })}
        </div>
        <Link to="/">
        <button>Sair</button>
        </Link>
      </div>
    </div>
  );
}

export { UsuarioPage };
