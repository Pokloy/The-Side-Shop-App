import { Form, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProductCardCss from './ProductCard.module.css';
import Swal from 'sweetalert2';



export default function AddBanner(){

	const [isActive, setIsActive] = useState(false);
	const [name, setName] = useState("");
	const [img, setImg] = useState("");


	function createBanner(e){
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`${process.env.REACT_APP_API_URL}/banners/addBanner`, {
			method:'POST',
	        headers: {
        		"Content-Type": "application/json",
        		Authorization: `Bearer ${localStorage.getItem('token')}`
        	},
        	body: JSON.stringify({
        		name:name,
        		img:img
        	})
		})
		.then(res => res.json())
		.then(data => {
				Swal.fire({
					title: "Banner Notification",
					icon: "success",
					text: "Banner Saved Success."
				});
				setName('');
				setImg('');
		})
		.catch(err => {
				Swal.fire({
					title: "Banner Failed",
					icon: "error",
					text: "Please try Again."
				});
		})

	}

		useEffect(() => {
			if(name !== '' && img !== ''){
				setIsActive(true);
			} else {
				setIsActive(false);
			}
		}, [name, img]);


	return(
		<Container className="d-flex justify-content-center my-3">
		    <Card style={{ width: '50rem' }} className="my-5">
			   <Card.Body>
				
					<div className={ProductCardCss.authHead}><h1 className="mb-0 pb-0 justify-content-left">Create Banner</h1></div>
					<Form onSubmit= {(e) => createBanner(e)}>
		                <Form.Group>
		                <Form.Control type="text" 
		                			  className="mb-3"
		                			  placeholder="Enter Name" 
		                			  required 
		                			  value={name}
		                			  onChange={e => {setName(e.target.value)}} 
		                			  />
		                </Form.Group>
		                <Form.Group>
		                <Form.Control type="text" 
	                   				  className="mb-3"
		                			  placeholder="Enter Image Link" 
		                			  required 
		                			  value={img}
		                			  onChange={e => {setImg(e.target.value)}}  
		                			  />
		                </Form.Group>
		                {		                
	                	isActive
	                	?
	                	<div className="d-flex justify-content-center">
						<button type="submit" id="submitBtn" className={ProductCardCss.btnLogin}>Submit</button>
						</div>
						:
						<div className="d-flex justify-content-center">
						<button type="submit" id="submitBtn" disabled className={ProductCardCss.loginButtonDisabled}>Submit</button>
		                </div>
		                }
					</Form>
		      </Card.Body>
			</Card>
		</Container>
	)
}