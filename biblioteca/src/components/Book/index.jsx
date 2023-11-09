/* eslint-disable react/prop-types */
import heart from "../../assets/icons/heart.svg"
import { Stars } from "./stars"
import styles from "./styles.module.scss"

function Book(props){
  return(
    <div className={styles.container}>
      <div className={styles.displayBook}>
        <div className={styles.bookImage}>
          <img src={props.imgBook} alt="" />
        </div>
        <div className={styles.bookDetails}>
          <h2 className={styles.booktitle}>{props.title}</h2>
          <h4>{props.authors}</h4>
          <p className={styles.bookDescription}>{props.description}</p>
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