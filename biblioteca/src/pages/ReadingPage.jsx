/* eslint-disable no-undef */
// import arrowLeft from "../assets/icons/arrowLeft.svg"
// import styles from "./reading.module.scss"
// import arrowRight from "../assets/icons/arrowRight.svg"
// import "../../../biblioteca-server/node_modules/epubjs/dist/epub.min.js"
import { ReactReader } from 'react-reader'
import { useState } from 'react'

function Reading(){

//   var book = ePub("http://localhost:3000/api/books/read/30.epub");
//   var rendition = book.renderTo("bookDisplay", {
//       method: "continuous",
//       width: "100%",
//       height: "100vh",
//   });
//   // eslint-disable-next-line no-unused-vars
//   var displayed = rendition.display();


// return(
//   <div className={styles.container}>
//     <div className={styles.containerBook}>
//       <img src={arrowLeft} alt="" />
//       <div className={styles.book}>
        
//       <div id="bookDisplay" style={{ width: '80%', margin: '0 auto', height: '100vh' }}></div>
//       </div>
//       <img src={arrowRight} alt="" />
//     </div>
//   </div>
// )

// const [url, setUrl] = useState(null);

// useEffect(() => {
//   const fetchUrl = async () => {
//     // Substitua isso pela sua chamada de API real
//     const response = await fetch("http://localhost:3000/api/books/read/30.epub");
//     const url = await response.text();
//     setUrl(url);
//   };

//   fetchUrl();
// }, []);

// useEffect(() => {
//   const fetchUrl = async () => {
//     // Substitua isso pela sua chamada de API real
//     const response = await fetch("http://localhost:3000/api/books/read/30.epub");
//     const blob = await response.blob();
//     const url = URL.createObjectURL(blob);
//     setUrl(url);
//   };

//   fetchUrl();
// }, []);

// console.log(url)

  const [location, setLocation] = useState(null)

  return (
    <div style={{ height: '100vh' }}>
      <ReactReader
        url="http://localhost:3000/api/books/read/29.epub"
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
        // getRendition={(rendition) => {
        //   //
        //   rendition.current = rendition;
        //   const spine_get = rendition.book.spine.get.bind(rendition.book.spine);  
        //   rendition.book.spine.get = (target) => {
        //       let t = spine_get(target);
        //       console.log(t);
        //       while ((t == null) && target.startsWith("../")) {
        //           target = target.substring(3);
        //           t = spine_get(target);
        //       }
        //       return t;
        //   }
        // }}
      />
  </div>
  )

}

export {Reading}