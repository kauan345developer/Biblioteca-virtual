import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import styles from './styles.module.scss'
import banner1 from '../../assets/banners/banner1.jpg'
function Banner(){
  return(
    <div className={styles.container}>
      <Carousel
      interval={null}
      indicators={false}
      >
        <Carousel.Item>
          <img src={banner1} alt=""  className={styles.banner}/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={banner1} alt="" className={styles.banner}/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={banner1} alt="" className={styles.banner}/>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}


export {Banner}