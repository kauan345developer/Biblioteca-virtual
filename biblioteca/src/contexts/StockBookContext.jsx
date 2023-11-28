/* eslint-disable no-unused-vars */
import { createContext, useState,useEffect } from "react";
import PropTypes from "prop-types"
import img1 from "../assets/bookCover/livro1.png"
export const StockContext = createContext({})
import { getAllBooks } from "../apis/api";




StockContextBookProvider.propTypes = {
  children: PropTypes.node
}

export  function StockContextBookProvider({children}){

  const [bookItems, setBookItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooks();
        console.log( await getAllBooks())
        setBookItems(response);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };
  
    fetchData();
  }, []); // Executa apenas uma vez, quando o componente é montado
  


  const addItem = (item) =>{
    setBookItems(current => {
      return [item,...current]
    })
  }

  const stockBook = {
    bookItems,
    addItem
  }

  return(
  <StockContext.Provider value={stockBook}>
    {children}
  </StockContext.Provider>
  )
}


