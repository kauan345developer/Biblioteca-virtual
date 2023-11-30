/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useId, useState } from "react";
import styles from "./styles.module.scss";
import img1 from "../../../assets/bookCover/livro1.png";
import { BookList } from "../../../components/BooksList";
import { Navigate } from "react-router-dom";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editora, setEditora] = useState("");
  const [author, setAuthor] = useState("");
  const [generos, setGeneros] = useState("");
  const [image, setImage] = useState("");
  const [ePub, setEpub] = useState("");

  const bookInfo = {
    titulo: title,
    sinopse: description.trim(),
    editora: editora,
    autores: author,
    generos: generos,
    capa: image,
    ePub: ePub,
  };

  const bookFiles = {
    capa: image,
    ePub: ePub,
  };

  const submit = async () => {
    try {
      let bookInfoTmp = bookInfo;
      bookInfoTmp.autores = bookInfoTmp.autores.split(", ").map((autor) => {
        return {
          nome: autor.split(" ")[0].trim(),
          sobrenome: autor.slice(autor.indexOf(" "), autor.length).trim(),
        };
      });

      bookInfoTmp.generos = bookInfoTmp.generos.split(",").map((genero) => {
        return {
          nome: genero.trim(),
        };
      });

      const response = await fetch("http://localhost:3000/api/books/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookInfo),
      });
      await response.json().then(async (data) => {
        const bookUpload = new FormData();
        bookUpload.append("ePub", bookFiles.ePub[0]);
        bookUpload.append("capa", bookFiles.capa[0]);

        const upload = await fetch(
          `http://localhost:3000/api/books/upload/${data.bookId}`,
          {
            method: "POST",
            body: bookUpload,
          }
        );
        if (upload.ok) {
          alert("Livro cadastrado com sucesso");
          Navigate("/admin");
        }
      });
    } catch (error) {
      console.log(error);
    }
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
        <label htmlFor="Generos">Gêneros</label>
        <input
          type="text"
          name="Generos"
          id="Generos"
          value={generos}
          onChange={(e) => setGeneros(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="editor">Editora</label>
        <input
          type="text"
          name="editora"
          id="editora"
          value={editora}
          onChange={(e) => setEditora(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="image">Imagem</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setImage(e.target.files)}
        />
      </div>

      <div>
        <label htmlFor="ePub">Arquivo ePub</label>
        <input
          type="file"
          name="ePub"
          id="ePub"
          onChange={(e) => setEpub(e.target.files)}
        />
      </div>

      <div className={styles.divTextArea}>
        <label htmlFor="Descricao">Descrição</label>
        <textarea
          name=""
          id=""
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button onClick={submit}>enviar</button>
    </div>
  );
}

export { CreateBook };
