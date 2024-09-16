import styles from "./styles.module.scss"
import { Navigate } from "react-router-dom"

function DeleteBook() {

  const deleteBook = async() => {
    try {
      const bookId = document.querySelector('#deleteBookId').value;
      const response = await fetch(`http://127.0.0.1:7999/api/books/delete/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Erro ao deletar o livro:', error);
    }
  }
  return(
  <div className={styles.container}>
    <label htmlFor="">ID para excluir</label>
    <input type="text" id="deleteBookId" />
    <button onClick={deleteBook}>excluir</button>
  </div>
  )
}

export {DeleteBook}