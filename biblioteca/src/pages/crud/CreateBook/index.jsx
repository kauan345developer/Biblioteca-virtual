import styles from "./styles.module.scss"

function CreateBook() {
  return(
      <div className={styles.container}>
        <div>
          <label htmlFor="Titulo">Titulo</label>
          <input type="text" name="Titulo" id="Titulo" />
        </div>

        <div>
          <label htmlFor="Autores">Autores</label>
          <input type="text" name="Autores" id="Autores" />
        </div>
        

        <div>
          <label htmlFor="image">Imagem</label>
          <input type="file" name="image" id="image" />
        </div>

        <div>
          <label htmlFor="Descricao">Descrição</label>
          <input type="text" name="" id="" />
        </div>
      <button>enviar</button>
    </div>
  )
}

export {CreateBook}