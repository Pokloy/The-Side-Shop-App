import { Container, Row, Col, Image } from 'react-bootstrap';
import ProductCardCss from './ProductCard.module.css';
import { useState, useEffect} from 'react';



export default function Banner(){
  
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/banners/`)
    .then(res=>res.json())
    .then(data => {
      const numbers = new Set();
      const featured = [];

        while(numbers.size < 3 && numbers.size < data.length){
          let randomNum = Math.floor(Math.random() * data.length);
          numbers.add(randomNum);
        }

        const uniqueNumbers = Array.from(numbers);

          uniqueNumbers.forEach(index => {
            featured.push(
                 <Image className={ProductCardCss.resizedImage} src={data[index].img} alt={data[index].name} />
              );
          });
          setPreviews(featured);
    })
  }, []);



	return(	
<Container className="my-5">
  <Row className="d-block d-lg-flex">
    <Col xs={12} lg={6} >
      <div className="d-flex justify-content-center align-items-center pb-5">
        {previews.slice(1, 2).map(preview => preview)}
      </div>
    </Col>
    <Col xs={12} lg={6} >
      <div className="d-flex justify-content-center align-items-center">
          {previews.slice(2, 3).map(preview => preview)}
      </div>
    </Col>
  </Row>
</Container>
	)
}