import {Book} from "../components/Book"
import imgBook from "../assets/bookCover/livro1.png"


function BookPage() {
  return (
  <Book 
    imgBook = {imgBook} 
    title = "O Pequeno Principe"
    authors = "Antoine de Saint-Exupéry"
    description = "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
    >
  </Book>
  )
}

export {BookPage};


