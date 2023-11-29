import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import UserContext from '../UserContext';
import { useContext } from 'react';
import moduleCSS from './AppNavbar.module.css'


export default function AppNavbar() {
	const { user } = useContext(UserContext);
  return (
  	
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">
              <img src="/TheSideSpot.png" alt="Company Logo" width="250px" height="auto" />
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
				  <Nav className="ms-auto"> {/* Changed from mx-auto to ms-auto */}
				    <Nav.Link as={NavLink} to="/" exact className='px-3'><h2 className={moduleCSS.font}>Home</h2></Nav.Link>
				    <Nav.Link as={NavLink} to="/products" exact className='px-3'><h2 className={moduleCSS.font}>Products</h2></Nav.Link>
				    {(user.id !== null) ?
				      user.isAdmin ?
				        <>
				          <Nav.Link as={NavLink} to="/orderHistory" exact className='px-3'><h2 className={moduleCSS.font}>Order History</h2></Nav.Link>
				          <Nav.Link as={NavLink} to="/addProducts" exact className='px-3'><h2 className={moduleCSS.font}>Add Products</h2></Nav.Link>
				          <Nav.Link as={NavLink} to="/allUser" exact className='px-3'><h2 className={moduleCSS.font}>All Users</h2></Nav.Link>
				          <Nav.Link as={NavLink} to="/logout" exact className='px-3'><h2 className={moduleCSS.font}>Log-out</h2></Nav.Link>
				        </>
				        :
				        <>
				          <Nav.Link as={NavLink} to="/logout" exact className='px-3'><h2 className={moduleCSS.font}>Log-out</h2></Nav.Link>
				        </>
				      :
				      <>
				        <Nav.Link as={NavLink} to="/login" exact className='px-3'><h2 className={moduleCSS.font}>Login</h2></Nav.Link>
				        <Nav.Link as={NavLink} to="/register" exact className='px-3'><h2 className={moduleCSS.font}>Register</h2></Nav.Link>
				      </>
				    }
				  </Nav>
				</Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}

