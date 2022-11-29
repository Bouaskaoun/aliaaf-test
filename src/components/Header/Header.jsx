import React, {useRef, useEffect} from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import { Container, Row } from 'reactstrap';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';


import './header.css';
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { toast } from 'react-toastify';

const nav__links = [
  {
    path:'home',
    display:'Home'
  },
  {
    path:'shop',
    display:'Shop'
  },
  {
    path:'login',
    display:'Login'
  }
]

const Header = () => {

  const {currentUser} = useAuth()
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const menuRef = useRef(null)
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
    signOut(auth).then(() => {
      toast.success('Logged out')
      navigate('/home')
    }).catch(err => {
      toast.error(err.message)
    })

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
                <h1>Aliaaf</h1>
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
                    currentUser ? (
                      <span onClick={logout}>Logout</span>
                    ) : (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        <Link to='/signup'>Signup</Link>
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