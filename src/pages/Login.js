import { Form, Container } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Card from 'react-bootstrap/Card';
import moduleCSS from './Product.module.css';


export default function Login() {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isActive, setIsActive] = useState(false)

	function authenticate(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/users/login`,{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			email: email,
			password: password
		})
	})
	.then(res => res.json())
	.then(data => {

		if(typeof data.access !== "undefined"){
			
			localStorage.setItem('token', data.access);

			retrieveUserDetails(data.access)

			setUser({
				access: localStorage.getItem('token')
			})

			Swal.fire({
				title: "Login Succesful",
				icon: "success",
				text: "Welcome to Zuitt!"
			});

		} else {

			Swal.fire({
				title: "Authentication failed",
				icon: "error",
				text: "Check your login details and try again."
			});

		}
	})

	setEmail('')
	setPassword('')

	}

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	};

	useEffect(() => {
		document.title = "TheSideSpot | Login";
		if(email !== '' && password !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email,password]);



	return (
		(user.id !==null)?
		<Navigate to="/products"/>
		:
		<Container className="d-flex justify-content-center my-5">
		    <Card style={{ width: '30rem' }}>
	      		<Card.Body>
					<Form onSubmit ={(e) => authenticate(e)}>
						<div className={moduleCSS.authHead}><h1 className="mb-0 pb-0 justify-content-left">Login</h1></div>
						<Form.Group controlId="userEmail" className="mt-0 mb-3">
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required				
						/>
						</Form.Group>
						<Form.Group controlId="userPassword" className="my-3">
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						</Form.Group>
						<div>
						{isActive ?
						<div className="text-center"><button type="submit" id="submitBtn" className={moduleCSS.btnLogin1}>Submit</button></div>
						:
						<div className="text-center"><button type="submit" id="submitBtn" disabled className={moduleCSS.loginButtonDisabled}>Submit</button></div>

						}
						</div>
					</Form>
			      </Card.Body>
			</Card>
		</Container>


	)
}