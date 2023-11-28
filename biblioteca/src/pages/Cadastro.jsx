import styles from "./cadastro.module.scss"
import logo from "../assets/LogoBiblioteca.png"

function Cadastro(){
  return(
    <div className={styles.container}>
      <div className={styles.login}>
      <div>
        <img src={logo} alt="" />
      </div>
        <div>
          <div>
            <label htmlFor="">Nome Completo</label>
            <input type="text" name="" id="" />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="text" name="" id="" />
          </div>
          <div>
            <label htmlFor="">Repita o Email</label>
            <input type="text" name="" id="" />
          </div>
          <div>
            <label htmlFor="">Senha</label>
            <input type="text" name="" id="" />
          </div>
          <div>
            <label htmlFor="">Repita a senha</label>
            <input type="text" name="" id="" />
          </div>
        <button>Cadastrar</button>
        </div>
      </div>
    </div>
  )
}

export{Cadastro}