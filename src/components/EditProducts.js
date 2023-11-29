import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";


export default function EditCourse({ product, fetchData }) {


	
	const [productId, setProductId] = useState("")

    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);


    const [showEdit, setShowEdit] = useState(false);


    const editProduct = (e, productId) => {
    	e.preventDefault();

    	fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`,{
    		method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
            	name:name,
            	img:img,
            	price:price,
            	quantity:quantity
            })
    	})
    	.then(res => res.json())
    	.then(data => {
            if(data === true) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Product successfully updated'
                })
                closeEdit();
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                })
                closeEdit();
                fetchData();
            }
    	})
    	.catch(err => {
    		Swal.fire({
            title: 'SERVER Error!',
            icon: 'error',
            text: 'Backend Data not recieved!'
            })
    	})
    }


    //UPDATE
    const openEdit = (productId) => {

    	fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`,{
    		method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
    	})
    	.then(res => res.json())
    	.then(data => {
	    	console.log(data);
    		setProductId(data._id)
    		setName(data.name)
    		setImg(data.img)
    		setPrice(data.price)
    		setQuantity(data.quantity)
    	})
    	setShowEdit(true);
    }


    const closeEdit = () => {
    		setShowEdit(false);
    		setName('');
    		setImg('');
    		setPrice(0);
    		setQuantity(0);
    }


    return (
    	<>
        <Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    



                        <Form.Group controlId="courseName">
                            <Form.Label className="mt-2">Name</Form.Label>
                            <Form.Control
                                
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                />
                        </Form.Group>


                        <Form.Group controlId="courseDescription">
                            <Form.Label className="my-2">Image</Form.Label>
                            <Form.Control
                                
                                type="text"
                                required
                                value={img}
                                onChange={e => setImg(e.target.value)}
                                />
                        </Form.Group>



                        <Form.Group controlId="coursePrice">
                            <Form.Label className="my-2">Price</Form.Label>
                            <Form.Control
                                
                                type="number"
                                required
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="coursePrice">
                            <Form.Label className="my-2">On stock Quantity</Form.Label>
                            <Form.Control

                                type="number"
                                required
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" size="sm" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
    	</>

    )
}


