import { Table, Container } from 'react-bootstrap';
import { useContext } from 'react';
import UserContext from '../UserContext';
import moduleCSS from './Product.module.css';
import { useNavigate } from 'react-router-dom';




export default function CheckOut(){
	const { user, setUser } = useContext(UserContext);

	const cart = user.cartItems;

	const navigate = useNavigate();

	const clearCart = (e) => {
      e.preventDefault()
      // setShowEdit(false);
    setUser(prevUser => ({
      ...prevUser,
      cartItems: [], 
    }));
      navigate("/products")
    };


	return(

		<Container>
			<div className="container mb-3" >
			<h1 className="my-5 text-center">THANK YOU FOR SHOPPING</h1>
				<Table striped bordered hover size="xs">
					<thead>
						<tr>
							<th>Product Name:</th>
							<th>Price:</th>
							<th>Sub Total:</th>
						</tr>
					</thead>
				
					<tbody>
					{ cart.map(items => (
						<tr key={items.productId}>
		              	  <td>{items.name}</td>
		                  <td>{items.price}</td>
		                  <td>{items.totalAmount}</td>
						</tr>
					))
					}
					</tbody>
					
				</Table>
				<div className="d-flex justify-content-center">

			        <button className={moduleCSS.btnCheckout} onClick={clearCart}>
			          Continue Shopping
			        </button>

				</div>
			</div>
		</Container>
	)
	
}