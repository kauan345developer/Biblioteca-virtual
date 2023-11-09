/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import styles from './styles.module.scss'

function Banner(props){
  return(
    <div className={styles.container}>
      <Carousel
      interval={null}
      indicators={false}
      >
        <Carousel.Item>
          <img src={props.urlBanner} alt=""  className={styles.banner}/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={props.urlBanner} alt="" className={styles.banner}/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={props.urlBanner} alt="" className={styles.banner}/>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}


export {Banner}