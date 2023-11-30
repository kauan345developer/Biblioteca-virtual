/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./login.module.scss";
import logo from "../assets/LogoBiblioteca.png";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const [loginError, setLoginError] = useState(null);
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then(async (response) => {
          return await response.json();
        })
        .then(async (data) => {
          if (data.success) {
            localStorage.setItem(`account`, JSON.stringify(data.token));
            history("/usuario");
          } else {
            setLoginError(data.message);
          }
        });
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      setLoginError("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <Link to="/">
          <div>
            <img src={logo} alt="" />
          </div>
        </Link>
        <form onSubmit={handleLogin} className={styles.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          
          {loginError && <div className={styles.error}>{loginError}</div>}
          <button type="submit">Login</button>
        </form>
        <div>
          <span>
            Cadastre-se,{" "}
            <a
              style={{ textDecoration: "none", fontWeight: "bold" }}
              href="/cadastro"
            >
              Clique Aqui
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export { Login };
