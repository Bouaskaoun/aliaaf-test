import React, {useRef, useEffect} from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import { Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";


import './header.css';
import logo from '../../assets/images/ALIAAF LOGO v1.png';
import userIcon from '../../assets/images/user-icon.png';
import { toast } from 'react-toastify';
import { logoutSuccess } from '../../redux/userRedux';

const nav__links = [
  {
    path:'home',
    display:'Home'
  },
  {
    path:'shop',
    display:'Books'
  }
]

const Header = () => {

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const profileActionRef = useRef(null)

  const stickyHeaderFunc = ()=>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header');
      } else{
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('persist:root');
    dispatch(logoutSuccess());
  
    navigate('/login');
    toast.success('Logged out')
  }

  useEffect(()=>{
    stickyHeaderFunc();
    return ()=> window.removeEventListener('scroll', stickyHeaderFunc)
  });

  const menuToggle = ()=> menuRef.current.classList.toggle('active__menu')

  const toggleProfileActions = ()=> profileActionRef.current.classList.toggle('show__profileActions')

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt='logo' />
              <div>
                <h1 className='text-success'>Aliaaf</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {
                  nav__links.map((item, index) =>(
                    <li className="nav__item" key={index}>
                      <NavLink 
                        to={item.path}
                        className={(navClass)=> navClass.isActive ? 'nav__active' : ''}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="nav__icons">
              <div className='profile'>
                <span>{user ? user.username :'Not logged'} </span>
                <motion.img 
                  whileTap={{ scale: 1.2 }} 
                  src={userIcon} 
                  alt='' 
                  onClick={toggleProfileActions}
                />
                <div 
                  className="profile__actions hide__profileActions" 
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {
                    user ? (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        <span onClick={logout}>Logout</span>
                        <Link to='/products'>Products</Link>
                        <Link to='/users'>Users</Link>
                      </div>
                    ) : (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        <Link to='/login'>Login</Link>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header