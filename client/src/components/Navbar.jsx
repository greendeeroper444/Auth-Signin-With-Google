import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // Make a POST request to the server's logout endpoint
      await axios.post('/signout', {}, { withCredentials: true });

      //clear the user context
      setUser(null);
      navigate('/signin')
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <Link to='/' className="navbar-brand">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to='/' className="nav-link mx-2">Home</Link>
          </li>
          {!user ? (
            <>
              <li className="nav-item">
                <Link to='/signin' className="nav-link mx-2">Signin</Link>
              </li>
              <li className="nav-item">
                <Link to='/signup' className="nav-link mx-2">Signup</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className='btn btn-success mx-2' onClick={handleLogout}>Logout</button>
            </li>
          )}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
      <form className="collapse navbar-collapse input-group ml-auto" style={{ width: '300px' }}>
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ marginRight: '10px' }}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </div>
        </form>
    </nav>
  )
}
