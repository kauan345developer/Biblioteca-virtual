import styles from "./styles.module.scss"

function DeleteBook() {
  return(
  <div className={styles.container}>
    <label htmlFor="">ID para excluir</label>
    <input type="text" />
    <button>excluir</button>
  </div>
  )
}

export {DeleteBook}