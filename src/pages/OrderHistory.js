import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import moduleCSS from './Product.module.css';



export default function OrderHistory(){

	const [orders, setOrders] = useState([]);

	useEffect(() => {
		document.title = "TheSideSpot | Order History";
		const getAllOrders = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/users/orders`,{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				});
				const data = await response.json();
				setOrders(data);
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		};

		getAllOrders();
	}, []);


	return (
		<div className="container my-5">
			<div className='text-center mb-4'><h1 className={moduleCSS.xoverflow}>Order History</h1></div>
			<Table striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>User Id</th>
						<th>Products</th>
						<th>Total Amount</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(order => (
						<tr key={order._id}>
							<td className='px-4'>{order.userId}</td>
							<td className='px-4'>
								<ul>
									{order.products.map(product => (
										<li key={product.productId}>
											Product ID: {product.productId}, Quantity: {product.quantity}
										</li>
									))}
								</ul>
							</td>
							<td className='px-4'>{order.totalAmount}</td>
						</tr>
					))}
				</tbody>
			</Table>	
		</div>
	);
}
