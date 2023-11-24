import logo from "../../assets/logoBiblioteca.png"
import styles from "./styles.module.scss"
import searchIcon from "../../assets/icons/search.svg"
import { Link } from 'react-router-dom';
function Header(){
  return(
    <div className={styles.container}>
      <Link to = "/">
      <img src={logo} alt="" className={styles.logo}/>
      </Link>
      <div className={styles.search}>
        <input type="text" />
        <button> <img src={searchIcon} alt="" /></button>
      </div>
      <button className={styles.loginButton}>Login</button>
    </div>
  )

}

export {Header}