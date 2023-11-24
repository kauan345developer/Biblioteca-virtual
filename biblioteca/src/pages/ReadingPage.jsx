import arrowLeft from "../assets/icons/arrowLeft.svg"
import styles from "./reading.module.scss"
import arrowRight from "../assets/icons/arrowRight.svg"
function Reading(){
return(
  <div className={styles.container}>
    <div className={styles.containerBook}>
      <img src={arrowLeft} alt="" />
      <div className={styles.book}>
      LIVRO
      </div>
      <img src={arrowRight} alt="" />
    </div>
  </div>
)
}

export {Reading}