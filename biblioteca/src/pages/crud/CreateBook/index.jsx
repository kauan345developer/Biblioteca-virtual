/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useId, useState } from "react";
import styles from "./styles.module.scss";
import img1 from "../../../assets/bookCover/livro1.png";
import { BookList } from "../../../components/BooksList";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const dados = {
    id: useId(),
    title: title,
    author: author,
    description: description,
    image: img1,
  };

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="Titulo">Titulo</label>
        <input
          type="text"
          name="Titulo"
          id="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="Autores">Autores</label>
        <input
          type="text"
          name="Autores"
          id="Autores"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="image">Imagem</label>
        <input type="file" name="image" id="image" />
      </div>

      <div>
        <label htmlFor="Descricao">Descrição</label>
        <textarea
          name=""
          id=""
          cols="130"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button>enviar</button>
    </div>
  );
}

export { CreateBook };
