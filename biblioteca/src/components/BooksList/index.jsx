/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../../../node_modules/slick-carousel/slick/slick.css";
// import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./styles.module.scss"
import "./slickCustom.css"
// import { BookPage } from "../../pages/bookPage";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { StockContext } from "../../contexts/StockBookContext";
import img1 from "../../assets/bookCover/livro1.png"

function BookList(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };


  // const Livro1 = useContext(StockContext)

  return (
    <div className={styles.container}>
      <h3> Livros mais vendidos </h3>
      <div className={styles.books}>
        <Slider {...settings}>

          <Link to='/book/1'>
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>

          <Link to = "/book/2">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>

          <Link to = "/book/3">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>

          <Link to = "/book/4">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>

            <Link to = "/book/5">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>
          <Link to = "/book/6">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>
          <Link to = "/book/7">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>
          <Link to = "/book/8">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>
          <Link to = "/book/9">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>
          <Link to = "/book/10">
          <div>
              <img src={img1} alt="" />
            </div>
          </Link>          
        </Slider>
      </div>
    </div>
  );
}








export {BookList}