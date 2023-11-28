/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { StockContext } from "../contexts/StockBookContext";
import styles from "./catalogo.module.scss"
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
        {bookItems.map((book, index) => {
          return (
            <div key={index}>
              <img src={book.imgBook.img1} alt="" />
              <p>{book.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Catalogo };
