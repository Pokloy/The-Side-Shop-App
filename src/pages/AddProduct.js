import {useState,useEffect, useContext} from 'react';
import { Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import moduleCSS from './Product.module.css';
import AddBanner from '../components/AddBanner';




export default function AddCourse(){
	const navigate = useNavigate();

	document.title = "TheSideSpot | Add Product";

	const {user} = useContext(UserContext);


	const [name, setName] = useState("");
	const [img, setImg] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [isActive, setIsActive] = useState(false);


	useEffect(() => {
		if (name !== '' && price !== '' && quantity !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [name, price, quantity]);


	


	function createProduct(e){

		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);


		fetch(`${process.env.REACT_APP_API_URL}/products/addProduct`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				name:name,
				img:img,
				price:price,
				quantity:quantity,
				isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			Swal.fire({
				icon:"success",
				title: "Product Added",
				text: "Product Added Successfully!"
			})
			navigate('/products')
		})
		.catch(err => {
			Swal.fire({
				icon:"error",
				title: "Product Failed",
				text: "Product Failed To Add!"
			})
		})


		setName('');
		setImg('');
		setPrice(0);
		setQuantity('');
	}


	return(
		(user.isAdmin === true)
		? 
		<>
		<Container className="d-flex justify-content-center my-3">
		    <Card style={{ width: '50rem' }} className="my-5">
			   <Card.Body>
				
					<div className={moduleCSS.authHead}><h1 className="mb-0 pb-0 justify-content-left">Create Product</h1></div>
					<Form onSubmit={e => createProduct(e)}>
		                <Form.Group>
		                <Form.Control type="text" 
		                			  className="mb-3"
		                			  placeholder="Enter Name" 
		                			  required value={name} 
		                			  onChange={e => {setName(e.target.value)}}/>
		                </Form.Group>


		                <Form.Group>
		                <Form.Control type="text" 
	                   				  className="mb-3"
		                			  placeholder="Enter Image Link" 
		                			  required value={img} 
		                			  onChange={e => {setImg(e.target.value)}}/>
		                </Form.Group>



		                <Form.Group>
		                <Form.Control type="text" 
	                   				  className="mb-3"
		                			  placeholder="Enter Price" 
		                			  required value={price} 
		                			  onChange={e => {setPrice(e.target.value)}}/>
		                </Form.Group>



		                <Form.Group>
		                <Form.Control type="number" 
	                   				  className="mb-2"
		                 			  placeholder="Enter Quantity" 
		                 			  required value={quantity} 
		                 			  onChange={e => {setQuantity(e.target.value)}}/>
		                </Form.Group>
		                {
		                
	                	isActive
	                	?
	                	<div className="d-flex justify-content-center">
						<button type="submit" id="submitBtn" className={moduleCSS.btnLogin}>Submit</button>
						</div>
						:
						<div className="d-flex justify-content-center">
						<button type="submit" id="submitBtn" disabled className={moduleCSS.loginButtonDisabled}>Submit</button>
		                </div>
		                }
		                
					</Form>
				
		      </Card.Body>
			</Card>
		</Container>
		<AddBanner />
		</>
		:
		navigate('/products')
	)
}