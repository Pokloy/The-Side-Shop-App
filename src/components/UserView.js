
import { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCardCss from './ProductCard.module.css';

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productArr = productsData
      .filter(product => product.isActive === true)
      .map(product => <ProductsCard productProp={product} key={product._id} />);

    setProducts(productArr);
  }, [productsData]);

  return (
    <Container>
      <Row>
      <div className="my-5 d-flex justify-content-center"><h1 className={ProductCardCss.productsH1Font}>SHOP ALL OUR PRODUCTS</h1></div>
          <hr></hr>
        {products.map((product, index) => (
          <Col key={index} xs={12} md={4}>
            {product}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
