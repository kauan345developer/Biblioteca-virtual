/* eslint-disable no-unused-vars */

import {Book} from "../components/Book"
// import imgBook from "../assets/bookCover/livro1.png"
import { useLocation } from "react-router-dom";
import { getBookById } from "../apis/api";
import { useEffect,useState } from "react";
// import image from "../../../biblioteca-server/public/livros/capas/1.png"

function BookPage() {
  const url = useLocation().pathname
  const id = url.match(/\/(\d+)$/)[1]
  console.log(id)
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookById(id);
        if (response !== null) {
          setBook(response);
        } else {
          console.log('Livro não encontrado com o ID:', id);
        }
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };
    
  
    fetchData();
  },[id]);

  const [image, setImage] = useState(null);

useEffect(() => {
  const loadImage = async () => {
    try {
      const img = await import(`../../../biblioteca-server/public/livros/capas/${id}.png`);
      setImage(img.default);
    } catch (error) {
      console.error('Erro ao carregar a imagem:', error);
    }
  };

  loadImage();
}, [id]);

  return (
    book ? (
      <Book
        imgBook = {image}
        title = {book.titulo}
        authors = {book.editora}
        description = {book.sinopse}
        bookID= {book.id}
      >
      </Book>
    ) : (
      <div>Carregando...</div>
    )
  )
}

export {BookPage};


