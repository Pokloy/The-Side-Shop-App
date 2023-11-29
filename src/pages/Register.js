import { useState, useEffect} from 'react';
import { Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Card from 'react-bootstrap/Card';
import moduleCSS from './Product.module.css';

export default function Register() {
	
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	
	const [isActive, setIsActive] = useState(false);

	console.log(email);
	console.log(password);
	console.log(confirmPassword);

	function registerUser(e) {
			e.preventDefault();

			fetch(`${process.env.REACT_APP_API_URL}/users/`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
				isAdmin:false
			})
			})
			.then(res => res.json())
			.then(data => {

	
				if(data){
					setEmail('');
					setPassword('');
					setConfirmPassword('');
					

				Swal.fire({
					title: "Registration Succesful",
					icon: "success",
					text: "You can now use your account"
				});

				} else {
					
				Swal.fire({
					title: "Registration Failed",
					icon: "error",
					text: "Please try again later."
				});
				}

			})
		}

	useEffect(() => {
		document.title = "TheSideSpot | Register";
		if(email !== "" && password === confirmPassword){

			setIsActive(true)

		} else {

			setIsActive(false)
		}
	},[email,password,confirmPassword])


	return (

	<Container className="d-flex justify-content-center my-5">
	    <Card style={{ width: '30rem' }}>
      		<Card.Body>
				<Form onSubmit= {(e) => registerUser(e)}>
				<div className={moduleCSS.authHead}><h1 className="mb-0 pb-0 justify-content-left">Register</h1></div>
					<Form.Group controlId="userEmail" className="mt-0 mb-3">
						<Form.Control 
						type="email" 
						placeholder="Enter Email" 
						required
						value={email}
						onChange={e => {setEmail(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group controlId="userPassword" className="my-3">
						<Form.Control 
						type="password" 
						placeholder="Enter Password" 
						required
						value={password}
						onChange={e => {setPassword(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group controlId="userConfirmPassword" className="my-3">
						<Form.Control 
						type="password" 
						placeholder="Confirm Password" 
						required
						value={confirmPassword}
						onChange={e => {setConfirmPassword(e.target.value)}}
						/>
					</Form.Group>

					{
						isActive

						? <div className="text-center"><button type="submit" id="submitBtn" className={moduleCSS.btnLogin1}>Submit</button></div>

						: <div className="text-center"><button type="submit" id="submitBtn" disabled className={moduleCSS.loginButtonDisabled}>Submit</button></div>
					}
				</Form>
	      </Card.Body>
		</Card>
	</Container>
	)
}

