/* eslint-disable no-unused-vars */
import { useContext, } from "react"
import { Book } from "../../../components/Book"
import { StockContext } from "../../../contexts/StockBookContext"
import styles from "./styles.module.scss"

function BookShelf(){
  const {bookItems} = useContext(StockContext)
  console.log(bookItems)

  return(
    <div className={styles.container}>
      {bookItems.map((book,index)=>{

        return(
          <div key={index}>
            <img src={book.imgBook.img1} alt="" />
            <p>{book.title}</p>   
          </div>
          )  
      })
      }
    </div>
    
  )
}

export {BookShelf}