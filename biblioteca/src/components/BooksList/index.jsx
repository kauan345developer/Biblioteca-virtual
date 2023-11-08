/* eslint-disable no-unused-vars */
import "../../../node_modules/slick-carousel/slick/slick.css";
// import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./styles.module.scss"
import livro1 from "../../assets/bookCover/livro1.png"
import "./slickCustom.css"
// import { BookPage } from "../../pages/bookPage";
import { Link } from 'react-router-dom';


function BookList() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };



  return (
    <div className={styles.container}>
      <h3> Livros mais vendidos </h3>
      <div className={styles.books}>
        <Slider {...settings}>

          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          <Link to = "/book">
          <div>
              <img src={livro1} alt="" />
            </div>
          </Link>
          
        </Slider>
      </div>
    </div>
  );
}








export {BookList}