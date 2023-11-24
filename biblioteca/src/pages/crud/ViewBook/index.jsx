import styles from "./styles.module.scss"
import { Book } from "../../../components/Book"
import bookCover from "../../../assets/bookCover/livro1.png"
function ViewBook() {
  return(
    <div className={styles.container}>
      <div className={styles.inputID }>
        <label htmlFor="">ID para visualisar Livro</label>
        <input type="text" />
        <button>Visualizar</button>
      </div>
      <div>
        <Book imgBook ={bookCover} description ={"O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."} title ={"O Pequeno Principe"}
        authors={"Antoine de Saint-Exupéry"}
        />      
      </div>
    </div>
  )
}

export {ViewBook}