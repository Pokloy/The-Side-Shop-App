import { useState, useEffect} from 'react';
import { CardGroup, Container, Row, Col } from 'react-bootstrap'
import ProductsCard from './ProductsCard';



export default function FeaturedProducts(){

	const [previews, setPreviews] = useState([]);

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/products/`)
		.then(res=>res.json())
		.then(data=>{
			const numbers = new Set();
			const featured = [];

	      	while (numbers.size < 3 && numbers.size < data.length) {
	        let randomNum = Math.floor(Math.random() * data.length);
	        numbers.add(randomNum);
	      }

	      const uniqueNumbers = Array.from(numbers);

  	      uniqueNumbers.forEach(index => {
	        featured.push(
	          <ProductsCard productProp={data[index]} key={data[index]._id} breakPoint={3}/>
	        );
	      });

	       setPreviews(featured);

		})
	}, []);


return (
  <Container>
    <Row className="justify-content-center">
      <Col xs={12}>
        <h2 className="text-center">Featured Products</h2>
      </Col>
    </Row>
    <Row>
      {previews.map((preview, index) => (
        <Col xs={12} sm={6} md={4} key={index} className="mb-4">
          {preview}
        </Col>
      ))}
    </Row>
  </Container>
);



}