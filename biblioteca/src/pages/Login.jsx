import styles from "./login.module.scss"
import logo from "../assets/LogoBiblioteca.png"

function Login() {
  return(
    <div className={styles.container}>
      <div className={styles.login}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
          <label htmlFor="">Senha</label>
          <input type="text" name="password" id="password" />
          <button>login</button>
        </div>
        <div>
          <span>Não tem login, <a href="">Clique Aqui</a></span>
        </div>
      </div>
    </div>
  )
}

export{Login}