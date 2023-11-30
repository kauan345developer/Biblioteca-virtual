import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./cadastro.module.scss";
import logo from "../assets/LogoBiblioteca.png";

function Cadastro() {
  const [cadastroData, setCadastroData] = useState({
    nome: "",
    email: "",
    repeatEmail: "",
    senha: "",
    repeatSenha: "",
  });

  const history = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCadastroData({
      ...cadastroData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!cadastroData.nome.trim()) {
      errors.nome = "Nome é obrigatório";
    }

    if (!cadastroData.email.trim()) {
      errors.email = "Email é obrigatório";
    }

    if (!cadastroData.repeatEmail.trim()) {
      errors.repeatEmail = "Repita o email é obrigatório";
    } else if (cadastroData.email !== cadastroData.repeatEmail) {
      errors.repeatEmail = "Os emails não coincidem";
    }

    if (!cadastroData.senha.trim()) {
      errors.senha = "Senha é obrigatória";
    }

    if (!cadastroData.repeatSenha.trim()) {
      errors.repeatSenha = "Repita a senha é obrigatória";
    } else if (cadastroData.senha !== cadastroData.repeatSenha) {
      errors.repeatSenha = "As senhas não coincidem";
    }

    return errors;
  };

  const handleCadastro = async () => {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cadastroData),
      });

      if (response.ok) {
        console.log("Cadastro bem-sucedido!");
        history("/login");
      } else {
        console.error("Falha no cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
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
        <div>
          <div>
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={cadastroData.nome}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={cadastroData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="repeatEmail">Repita o Email</label>
            <input
              type="email"
              name="repeatEmail"
              id="repeatEmail"
              value={cadastroData.repeatEmail}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              value={cadastroData.senha}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="repeatSenha">Repita a Senha</label>
            <input
              type="password"
              name="repeatSenha"
              id="repeatSenha"
              value={cadastroData.repeatSenha}
              onChange={handleInputChange}
            />
          </div>
          {errors.nome && <div className={styles.error}>{errors.nome}</div>}
          {errors.email && <div className={styles.error}>{errors.email}</div>}
          {errors.repeatEmail && (
            <div className={styles.error}>{errors.repeatEmail}</div>
          )}
          {errors.senha && <div className={styles.error}>{errors.senha}</div>}
          {errors.repeatSenha && (
            <div className={styles.error}>{errors.repeatSenha}</div>
          )}
          <button onClick={handleCadastro}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export { Cadastro };
