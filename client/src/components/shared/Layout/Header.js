import React from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate,useLocation ,Link} from 'react-router-dom';

const Header = () => {
  const { existingUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location=useLocation()
  console.log("existingUser in Header:", existingUser);


  const handleLogOut = () => {
    localStorage.clear();
    alert('Logout successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-brand h1">
          <BiDonateBlood color="red" /> Blood Bank App
        </div>
        <ul className="navbar-nav flex-row">
          <li className="nav-item">
            <p className="navlink">
              <FaRegUserCircle color="white" />
              Welcome{" "}
              {existingUser?.name ||
                existingUser?.hospitalName ||
                existingUser?.organisationName}
              &nbsp;
              {existingUser?.role && (
    <span className="badge bg-secondary">{existingUser.role}</span>
  )}
</p>
          </li>
          {
            (location.pathname==='/'||location.pathname==='/donor'||location.pathname==='/hospital'?(
                <li className='nav-item mx-3'>
                  <Link to='/analytics' className='nav-link'>
                  Analytics
                  </Link>
                </li>
            ):(
              <li className='nav-item mx-3'>
                  <Link to='/' className='nav-link'>
                  Home
                  </Link>
                </li>
            ))
          }
          <li className="nav-item mx-4">
            <button className="btn btn-danger" onClick={handleLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
