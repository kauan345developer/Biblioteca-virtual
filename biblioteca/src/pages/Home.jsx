import { Banner } from "../components/CarrouselBanner"
import { BookList } from "../components/BooksList"
import banner1 from '../assets/banners/banner1.jpg'
import livro1 from "../assets/bookCover/livro1.png"


function Home(){
return(
  <div>
    <Banner urlBanner={banner1}></Banner>
    <BookList Livro1 = {livro1}></BookList>
  </div>
)
}


export {Home}