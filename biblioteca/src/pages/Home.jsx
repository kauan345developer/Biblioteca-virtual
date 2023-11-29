import { Banner } from "../components/CarrouselBanner"
import { BookList } from "../components/BooksList"
import banner1 from '../assets/banners/banner1.jpg'
import { Nav } from "../components/Nav"
// import livro1 from "../assets/bookCover/livro1.png"


function Home(){
return(
  <div>
    <Nav/>
    <Banner urlBanner={banner1}></Banner>
    <BookList ></BookList>
  </div>
)
}


export {Home}