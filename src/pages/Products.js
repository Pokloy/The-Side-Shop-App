import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import Container from 'react-bootstrap/Container';


import UserView from '../components/UserView';
import AdminView from '../components/AdminView';



export default function Products(){

	const { user } = useContext(UserContext);

	const [products, setProducts] = useState([]);

	const fetchData = () => {
		fetch(`${process.env.REACT_APP_API_URL}/products/`)
		.then(res => res.json())
		.then(data => {
			setProducts(data);
		})
	}

	useEffect(() => {
		fetchData()		
		document.title = "TheSideSpot | Products";
	}, []);
		
	return (
		<Container>
			{
				(user.isAdmin === true)?
				<AdminView productsData={products} fetchData={fetchData}/>
				:
				<UserView productsData={products}/>

			}
		</Container>
	)
}