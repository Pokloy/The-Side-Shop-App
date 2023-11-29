import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import moduleCSS from './Product.module.css'
import AddProduct from '../components/AddProduct'


export default function ProductView(){
	const { user } = useContext(UserContext);

	const { productId } = useParams();

    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [origPrice, setOrigPrice] = useState(0);
    let [quantity, setQuantity] = useState(0);

    let [price, setPrice] = useState(0);


    const viewProd = (productId) => {
    	fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
    		method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token')}`
			}
    	})
    	.then(res => res.json())
    	.then(data => {

    		setName(data.name);
    		setImg(data.img);
    		setOrigPrice(data.price);
    	})
    }

    useEffect(()=>{
    	viewProd(productId);
    }, [productId])


    // Add Product
    let addQuantity = (quantity) => {

    	setQuantity(quantity+1)
    	setPrice(price + 250)
    }

    // Minus Product
   let minusQuantity = (quantity) => {
  
    	if(quantity === 0){
		   	alert("Please add quantity")    		
    	} else {
	    	setQuantity(quantity-1)
	    	setPrice(price - 250)
    	}	
    }


    return(
<Container>
  <div className="my-5 d-flex justify-content-center"><h1 className={moduleCSS.productsSingleFont}>SINGLE PRODUCTS VIEW</h1></div>
  <hr className="mt-5" />

  <Row>
    <Col xs={12} lg={6} className="my-5">
      <h2 className={moduleCSS.prodSingleTitle}>{name}</h2>
      <img src={img} style={{ maxWidth: '90%', height: 'auto' }} alt={name} />
    </Col>

    <Col xs={12} lg={6} className="pt-lg-5 mt-lg-5">
      <Container className="px-5">
        <Row>
          <Col xs={5} className="d-flex flex-column justify-content-left">

            <div className="d-flex justify-content-left mt-lg-3">
              <p className={moduleCSS.priceFont}>Price: ₱{origPrice}</p>
              <p className={moduleCSS.priceFont1}>(₱500 VALUE)</p>
            </div>

            <div className="d-flex justify-content-left pt-lg-4 mt-lg-1">
              <p className={moduleCSS.priceFont}> Quantity</p>
              <div className="p-1"></div><p className={moduleCSS.priceFont}>{quantity}</p>
            </div>

            <div className="d-flex justify-content-left pt-lg-4 mt-lg-1">
              <p className={moduleCSS.priceFont}>Subtotal: ₱{price}</p>
            </div>

          </Col>

          <Col xs={7} className="d-flex flex-column justify-content-left">
            {user.id !== null ?
              <AddProduct productsId={productId} totalQuantity={quantity} totalPrice={price} />
              :
              <Link className={moduleCSS.btnLink} to="/login">Log-In Now</Link>
            }

            <div className="d-flex justify-content-left pt-lg-5">
              <button className={moduleCSS.btnStyle2} onClick={() => addQuantity(quantity)}><span className="fa fa-plus mr-2"></span></button>
              <button className={moduleCSS.btnStyle2} onClick={() => minusQuantity(quantity)}><span className="fa fa-minus ml-2"></span></button>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
</Container>

    )
}