import logo from "../../assets/logoBook.png"
import styles from "./styles.module.scss"
import searchIcon from "../../assets/icons/search.svg"

function Header(){
  return(
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo}/>
      <div className={styles.search}>
        <input type="text" />
        <button> <img src={searchIcon} alt="" /></button>
      </div>
      <button className={styles.loginButton}>Login</button>
    </div>
  )

}

export {Header}