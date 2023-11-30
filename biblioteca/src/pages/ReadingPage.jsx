// import styles from "./reading.module.scss"
import { ReactReader } from 'react-reader'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

function Reading(){
  const [location, setLocation] = useState(null)

  const { bookID } = useParams();

  return (
    <div style={{ height: '100vh' }}>
      <ReactReader
        url={`http://localhost:3000/api/books/read/${bookID}.epub`}
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