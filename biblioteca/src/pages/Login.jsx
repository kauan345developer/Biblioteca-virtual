import { useState } from "react";
import { useHistory } from 'react-router-dom';
import styles from "./login.module.scss";
import logo from "../assets/LogoBiblioteca.png";

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('Login bem-sucedido!');
        history.push('/bookpage');
      } else {
        const data = await response.json();
        setLoginError(data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setLoginError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div>
          <img src={logo} alt="" />
        </div>
        <form onSubmit={handleLogin}>
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
            Cadastre-se, <a href="/cadastro">Clique Aqui</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export { Login };
