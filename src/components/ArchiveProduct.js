import React, { useState } from "react";



export default function ArchiveProduct({ productId, fetchData, productIsActive }){


	const [isActive, setIsActive] = useState()


	const archiveToggle = () => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
			method: 'PATCH',
			headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
		})
		.then(res => res.json())
		.then(data => {
			setIsActive(true);
			fetchData();
		})
		.catch(err => {
			console.error(err);
		})
	}


	const activateToggle = () => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
			method: 'PATCH',
			headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
		})
		.then(res => res.json())
		.then(data => {
			setIsActive(false);
			fetchData();
		})
		.catch(err => {
			console.error(err);
		})
	}

	

	return(
        <button className={productIsActive ? "btn btn-danger" :  "btn btn-success"} onClick={isActive ? activateToggle :  archiveToggle}>
            {productIsActive ? "Archive"  : "Activate" }
        </button>
	)
}