import heart from "../../assets/icons/heart.svg"
import { Stars } from "./stars"
import styles from "./styles.module.scss"
import book from "../../assets/bookCover/livro1.png"
function Book(){
  return(
    <div className={styles.container}>
      <div className={styles.displayBook}>
        <div className={styles.bookImage}>
          <img src={book} alt="" />
        </div>
        <div className={styles.bookDetails}>
          <h2 className={styles.booktitle}>TITULO</h2>
          <h4>AUTOR</h4>
          <p className={styles.bookDescription}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, labore debitis! Sit animi quae, numquam quis, cupiditate voluptas expedita repudiandae sunt voluptatum iste minus error.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, labore debitis! Sit animi quae, numquam quis, cupiditate voluptas expedita repudiandae sunt voluptatum iste minus error.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, labore debitis! Sit animi quae, numquam quis, cupiditate voluptas expedita repudiandae sunt voluptatum iste minus error.</p>
          <button className={styles.btnBuy}>comprar</button>
          <div className={styles.icons}>
            <img src={heart} alt="" />
            <div className={styles.divStars}>
              <Stars></Stars>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export {Book}