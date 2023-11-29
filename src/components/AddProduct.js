import { Modal, Table } from "react-bootstrap";
import { useState, useContext } from "react";
import ProductCardCss from './ProductCard.module.css';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';


export default function AddProduct({ productsId, totalQuantity, totalPrice }) {


  const { user, setUser } = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);

  const [showEdit, setShowEdit] = useState(false);


  const navigate = useNavigate();





  const checkOutOrder = () => {
  let sumOfAll = 0; 

  for (let i = 0; i < user.cartItems.length; i++) {
      sumOfAll += user.cartItems[i].totalAmount; 
  }

    fetch(`${process.env.REACT_APP_API_URL}/users/checkout`,{
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
           products: user.cartItems
        })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      navigate("/checkout");
    })
  }




  const viewProd = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      const newItem = {
        productId: productId,
        name: data.name,
        price: data.price,
        quantity: 1,
        totalAmount: totalPrice
      };
      setCartItems([...cartItems, newItem]);
      // setProdId(productId);
      // setName(data.name);
      // setPrice(data.price);
      // setQuantity(totalQuantity);
      // setTotalPrice(totalPrice);

      setShowEdit(true);

    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  };

  const addCart = (e) => {
    e.preventDefault()
    // setShowEdit(false);

    setUser(prevUser => ({
      ...prevUser,
      cartItems: Array.isArray(prevUser.cartItems)
        ? [...prevUser.cartItems, ...cartItems]
        : [...cartItems],
    }));
  };

  const hidemodel = () => {
    setShowEdit(false);
    setCartItems([]); 
  }

    const clearCart = () => {

      // setShowEdit(false);
    setUser(prevUser => ({
      ...prevUser,
      cartItems: [], 
    }));
    };




  return (
    <>
      <button className={ProductCardCss.btnCustom} onClick={() => viewProd(productsId)}><span class="fa fa-shopping-cart mr-2"></span></button>
      <Modal show={showEdit} size="xl">
        <h1 className="my-5 text-center">ITEM ADDED TO YOUR CART</h1>
        <div className="container mb-3" >
          <Table striped bordered hover size="xs">
            <thead>
              <tr>
                <th>Product Name:</th>
                <th>Price per product</th>
                <th>Sub Total Price</th>
              </tr>
            </thead>
            <tbody>
              {user.cartItems && user.cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
          <button className={`${ProductCardCss.btnCustom} ${ProductCardCss.btnPurchProduct}`} onClick={hidemodel}>CLOSE</button>
          <button className={`${ProductCardCss.btnCustom} ${ProductCardCss.btnContiShopping}`} onClick={e=>addCart(e)}>
                ADD TO CART </button>

            <button className={`${ProductCardCss.btnCustom} ${ProductCardCss.btnPurchProduct} ${ProductCardCss.linkCustom}`} onClick={checkOutOrder}>
            CHECKOUT
            </button>

           <button className={`${ProductCardCss.btnCustom} ${ProductCardCss.btnContiShopping}`} onClick={clearCart}>CLEAR CART</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
