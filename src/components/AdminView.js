import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProducts from './EditProducts';
import ArchiveProducts from './ArchiveProduct';
import ProductCardCss from './ProductCard.module.css';
import ShowAllBanner from './ShowAllBanner'



export default function AdminView({ productsData, fetchData }){


	const [products, setProducts] = useState([]);

	useEffect(() => {
		const productArr = productsData.map(product => {
			return (
				<tr key={product._id}>
					<td className='px-4'>{product._id}</td>
					<td className='px-4'>{product.name}</td>
					<td className='px-4'>{product.price}</td>
					<td className='px-4'>{product.quantity}</td>
					<td className={`px-4 text-center ${product.isActive ? 'text-success' : 'text-danger'}`}>{product.isActive ? 'Available' : 'Unavailable'}</td>
					<td className='px-4 text-center'><EditProducts product={product._id} fetchData={fetchData}/></td>
					<td className='px-3 text-center'><ArchiveProducts productId={product._id} productIsActive={product.isActive} fetchData={fetchData}/></td>
				</tr>

			)

		})

		setProducts(productArr)
	}, [productsData, fetchData])


	
	return(
		<>
			<div className="container my-5">
				<div className='text-center mb-4'><h1 className={ProductCardCss.xoverflow}>Admin Dashboard</h1></div>
				<Table striped bordered hover responsive>
					<thead>
						<tr className="text-center">
							<th>ID</th>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Availability</th>
							<th>Action</th>
							<th>Avail Changer</th>
						</tr>
					</thead>

					<tbody>
						{products}
					</tbody>
				</Table>	
			</div>
			<ShowAllBanner />
		</>
	)
}