/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { StockContext } from "../contexts/StockBookContext";
import styles from "./catalogo.module.scss";
import { Link } from "react-router-dom";
// import img from "../../../biblioteca-server/public/livros/capas/${book.id}.png"
// import { getAllBooks } from "../apis/api.js";

// async function all(){

//   console.log( await getAllBooks())
// }
// all()

function Catalogo() {
  const { bookItems } = useContext(StockContext);
  return (
    <div className={styles.container}>
      <h1>Catalogo</h1>
      <div className={styles.gridContainer}>
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
            <Link style={{ textDecoration: 'none' }} to = {`/book/${book.id}`} key={book.id}>
            <div>
              <MeuComponente />
              <p>{book.titulo}</p>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export { Catalogo };
