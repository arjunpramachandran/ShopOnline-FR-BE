import React, { useState } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './Root.css'
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./authSlice";



const Root = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = token;


  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  };
  const showProfileMenu = () => {
    setProfileMenuVisible(true);
  };

  const hideProfileMenu = () => {
    setProfileMenuVisible(false);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div>
      <div className='container'>
        <nav className='navbar navbar-expand-lg'>
          <div className="container-fluid ">

            <Link to="/" className="navbar-brand" href="#"><img src="./12-2-online-shopping-png-clipart.png" alt="" width={'50px'} />
              <h6>OnlineShop</h6>
            </Link>



            <div className='collapse navbar-collapse' id="navbarSupportedContent">

              <ul className='menu-left me-auto mb-2 mb-lg-0 navbar-nav'>
                <li className='nav-item'><Link to="/" className='nav-link'>Home</Link></li>
                
                  <li className='nav-item'><Link to={isAuthenticated? "/addProduct" :'/login' }className='nav-link'>Sell Your Product</Link></li>
                

                <li className='nav-item'><a href="#footer" className='nav-link'>Contact Us</a></li>
              </ul>

              <form className="d-flex gap-3 p-2 search-form" role="search">

                <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn search-btn" type="submit">
                  <img src="./search-icon.svg" alt="search-icon" />
                </button>


              </form>
            </div>

            <div className="menu-right">
              {isAuthenticated ? (
                <>
                  <div><img src="./favorite.svg" alt="favorite-icon" /><span className="fly-item">0</span></div>
                  <Link style={{ position: 'relative' }} to='/cart'><img src="./shopping_cart.svg" alt="cart-icon" /><span className="fly-item">{cartItems.length}</span></Link>
                </>
              ) : null}
              <div className="profile" onMouseEnter={showProfileMenu} onMouseLeave={hideProfileMenu}>
                <img src="./person.svg" alt="profile-icon" />
                <div className="profile-menu" style={{ display: profileMenuVisible ? 'flex' : 'none', position: 'absolute' }}>
                  {isAuthenticated ? (
                    <a onClick={handleLogout} ><img src="./logout-white.svg" alt="" />Logout</a>
                  ) : (
                    <Link to="/login"><img src="./login.svg" alt="" />Login</Link>
                  )}
                  {isAuthenticated ? null : (

                    <Link to='/signup'><img src="./person_add.svg" alt="" />Sign Up</Link>

                  )}

                  <a href="#"><img src="./manage_accounts.svg" alt="" />Setings</a>
                </div>
              </div>
            </div>


            <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={toggleNavbar} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span >
                <img src={isOpen ? "./close.svg" : "./menu.svg"} alt="" />
              </span>
            </button>
          </div>

        </nav>
        <main>

          <Outlet />
        </main>
      </div>

      <footer id="footer">
        <div className="row d-flex justify-content-around">
          <div className="col-md-3 d-flex flex-column">
            <h4>About Us</h4>
            <p>
              Welcome to our online store, your one-stop destination for an unparalleled shopping experience. We pride ourselves on offering a diverse range of high-quality products to meet your every need, all at unbeatable prices. Our mission is to make your shopping journey as seamless, enjoyable, and rewarding as possible.
            </p>
          </div>
          <div className="col-md-3 d-flex flex-column">
            <h4>Usefull Links</h4>
            <Link to="/" className="link">Men Fashion</Link>
            <Link to="/" className="link">Women Fashion</Link>
            <Link to="/" className="link">Jewellery</Link>
            <Link to="/" className="link">Electronics</Link>

          </div>
          <div className="col-md-3 d-flex flex-column gap-2">
            <h4>Contact Us</h4>
            <div className="contact">
              <div>
                <a href="#">
                  <img src="/location.svg" alt="" />
                  No.22 Shop Online Bazar, India 202020
                </a>

              </div>
              <div>
                <a href="#">
                  <img src="./phone.svg" alt="" />25052555
                </a>
              </div>
              <div>
                <a href="#">
                  <img src="./email.svg" alt="" />shoponline@shop.com
                </a>
              </div>
            </div>
            <div className="d-flex gap-2">
              <a href="#"><img src="./apple-fill.png" alt="" /></a>
              <a href="#"><img src="./google-play-fill.png" alt="" /></a>
              <a href="#"><img src="./instagram-fill.png" alt="" /></a>
              <a href="#"><img src="./facebook-fill.png" alt="" /></a>
              <a href="#"><img src="./threads-fill.png" alt="" /></a>
              <a href="#"><img src="./whatsapp-fill.png" alt="" /></a>
              <a href="#"><img src="./youtube-fill.png" alt="" /></a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center border-top border-bottom">©arjunpramachandran@2025</div>

      </footer>
    </div>
  )
}

export default Root