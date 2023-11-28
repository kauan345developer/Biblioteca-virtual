/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext,useEffect,useState } from "react"
import { Book } from "../../../components/Book"
import { StockContext } from "../../../contexts/StockBookContext"
import styles from "./styles.module.scss"
import image from "../../../../../biblioteca-server/public/livros/capas/1.png"

function BookShelf(props){
  const {bookItems} = useContext(StockContext)
  console.log(bookItems)
  
  return(
    <div className={styles.container}>
      {bookItems.map((book,index)=>{
        
        const MeuComponente = () => {
          const [caminhoDaImagem, setCaminhoDaImagem] = useState(null);
        
          useEffect(() => {
            import(`../../../../../biblioteca-server/public/livros/capas/${book.id}.png`)
              .then((image) => {
                setCaminhoDaImagem(image.default);
              })
              .catch((error) => {
                console.error(`Error loading image: ${error}`);
              });
          },);
        
          if (!caminhoDaImagem) {
            return null; // or return a placeholder image
          }
        
          return <img src={caminhoDaImagem} alt="Descrição da imagem" />;
        };

        return(
          
          <div key={book.id}>
            <MeuComponente/>
            <p>{book.titulo}</p>   
          </div>
          )  
      })
      }
    </div>
    
  )
}

export {BookShelf}