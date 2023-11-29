import React, { useState } from 'react';
import Swal from 'sweetalert2';



export default function DeleteBanner({ bannerId }){

	const deletebanner = () => {
		fetch(`${process.env.REACT_APP_API_URL}/banners/${bannerId}/deleteBanner`,{
			method: 'DELETE',
			headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
		})
		.then(res => res.json())
		.then(data => {
			Swal.fire({
				title: "Banner Notification",
				icon: "success",
				text: "Banner Deleted Successfully"
			});
		})
		.catch(error => {
			Swal.fire({
				title: "Banner Notification",
				icon: "error",
				text: "Please Try Again"
			});
		})
	}


	return(
		<button className="btn btn-danger" onClick={deletebanner}>DELETE</button>
	)

}