/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from "prop-types"
import img1 from "../assets/bookCover/livro1.png"
export const StockContext = createContext({})

StockContextBookProvider.propTypes = {
  children: PropTypes.node
}

export function StockContextBookProvider({children}){

  const [bookItems, setBookItems] = useState([{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  },{
    imgBook : {img1}, 
    title : "O Pequeno Principe",
    authors : "Antoine de Saint-Exupéry",
    description : "O pequeno príncipe é um clássico da literatura infantil que narra a amizade entre um menino e um piloto de avião. O principezinho vem do asteroide B 612, e encontra o piloto no deserto do Saara. A obra fala de amor, amizade e sobre a sabedoria infantil."
  }])


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


