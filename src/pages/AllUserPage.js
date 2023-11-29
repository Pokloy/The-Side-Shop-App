import { Table, Button } from 'react-bootstrap';
import ProductCardCss from './Product.module.css';
import { useState, useEffect } from 'react';
import ArchivedUser from '../components/ArchivedUser';


export default function AllUserPage() {

  const [userData, setUserData] = useState([]);
  const [idUser, setIdUser] = useState();

  const allUser = () => {
    document.title = "TheSideSpot | Users";
    let token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
	       const usersTable = data.map(user => {
	        return (
	          <tr key={user._id}>
	            <td className='px-4'>{user._id}</td>
	            <td className='px-4'>{user.email}</td>
	            <td className='px-4'>{user.password}</td>
	            <td className='px-4'>{user.isAdmin ? 'Admin' : 'User'}</td>
	            <td className='px-4'>
	              <ArchivedUser userId={user._id} isAdminActive={user.isAdmin} allUser={allUser}/> 
	            </td>
	          </tr>
	        );
	      });
	     setUserData(usersTable);
      });
  };


  useEffect(() => {
  		allUser();
  }, []);


  
  return (
    <>
      <div className="container my-5">
        <div className='text-center mb-4'>
          <h1 className={ProductCardCss.xoverflow}>All Users</h1>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>Admin Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData}
          </tbody>
        </Table>
      </div>
    </>
  );
}
