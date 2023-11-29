import { Card, Container } from 'react-bootstrap';
import ProductCardCss from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct'; 




export default function ProductCard({ productProp }) {
  const { _id, img, name, price, quantity } = productProp;


  return (
   
      <section className='my-5'>
        <Container>
         <div className={ProductCardCss.prodEffects}>
         <Link className={ProductCardCss.linkCustom} to={`/products/${_id}`}>
          <Card className="d-flex justify-content-left align-items-left">
            <Card.Body>
              <Card.Img variant="top" src={img} className={ProductCardCss.productImg} />
              <Card.Title className={ProductCardCss.productsH1Font}>{name}</Card.Title>
              <Card.Subtitle className={ProductCardCss.productsH1Font}>Price:</Card.Subtitle>
              <Card.Text className={ProductCardCss.productsH1Font}>PhP {price}</Card.Text>

            </Card.Body>
          </Card>
        </Link>
        </div>
        <div className="text-center">
          <AddProduct productsId={_id} totalQuantity={quantity} totalPrice={price} />
        </div>
          </Container>
      </section>
    
  );
}
