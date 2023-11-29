import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import ProductCardCss from './ProductCard.module.css';
import DeleteBanner from './DeleteBanner';



export default function ShowAllBanner(){
	const [banner, setBanner] = useState([]);



	useEffect(() => {
	    fetch(`${process.env.REACT_APP_API_URL}/banners/`)
	    .then(res=>res.json())
	    .then(data => {
			const bannerTable = data.map(data => {
				return (
					<tr key={data._id}>
						<td className='px-4'>{data.name}</td>
						<td className='px-4'>{data.img}</td>
						<td className='px-4 text-center'><DeleteBanner bannerId={data._id}/></td>
					</tr>
				)
			})
			setBanner(bannerTable);
		})
	}, [banner])


  return (
    <>
      <div className="container my-5">
        <div className='text-center mb-4'>
          <h1 className={ProductCardCss.xoverflow}>All Banners</h1>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Image Link</th>
              <th>Delete Action</th>
            </tr>
          </thead>
          <tbody>
            {banner}
          </tbody>
        </Table>
      </div>
    </>
  );
}

