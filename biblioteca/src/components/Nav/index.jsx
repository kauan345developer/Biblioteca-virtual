import { Link } from "react-router-dom"
import styles from "./styles.module.scss"

function Nav(){
  return(
    <nav className={styles.nav}>
      <Link style={{ textDecoration: 'none' }} to= "catalogo">
      <span >CATAlOGO</span>
      </Link>
    </nav>
  )
}

export {Nav}