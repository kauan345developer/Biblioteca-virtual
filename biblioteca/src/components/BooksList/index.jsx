/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../../../node_modules/slick-carousel/slick/slick.css";
// import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./styles.module.scss";
import "./slickCustom.css";
// import { BookPage } from "../../pages/bookPage";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { StockContext } from "../../contexts/StockBookContext";
import img1 from "../../assets/bookCover/livro1.png";
import { getMostSold } from "../../apis/api.js";
function BookList(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },{
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },{
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const Livro1 = useContext(StockContext)

  const [bookItems, setBookItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMostSold();
        console.log(await getMostSold());
        setBookItems(response);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h3> Livros mais vendidos </h3>
      <div className={styles.books}>
        <Slider {...settings}>
          {bookItems.map((book) => {
            const MeuComponente = () => {
              const [caminhoDaImagem, setCaminhoDaImagem] = useState(null);

              useEffect(() => {
                import(
                  `../../../../biblioteca-server/public/livros/capas/${book.id}.png`
                )
                  .then((image) => {
                    setCaminhoDaImagem(image.default);
                  })
                  .catch((error) => {
                    console.error(`Error loading image: ${error}`);
                  });
              });

              if (!caminhoDaImagem) {
                return null; // or return a placeholder image
              }

              return <img src={caminhoDaImagem} alt="Descrição da imagem" />;
            };

            return (
              <Link to={`/book/${book.id}`} key={book.id}>
                <div className={styles.divImgs}>
                  <MeuComponente />
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export { BookList };
