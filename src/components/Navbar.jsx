import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import  SpringStoreLogo from '../assets/img/Logo.png';
import { CartContext } from "../context/CartContext";

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = ()=>{ logout(); nav('/'); };
const { cartCount } = useContext(CartContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand" to="/"><img src={SpringStoreLogo} width="50" height="30" className="d-inline-block align-top" alt=""/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Products</Link></li>
            <li className="nav-item">
  <Link className="nav-link position-relative" to="/cart">
    Cart
    {cartCount > 0 && (
      <span className="badge bg-danger rounded-circle position-absolute top-1 start-100 translate-middle">
        {cartCount}
      </span>
    )}
  </Link>
</li>
            {user ? (
              <>
                <li className="nav-item"><span className="nav-link">{user.name}</span></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>
                {user.role === 'ROLE_ADMIN' && <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>}
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}