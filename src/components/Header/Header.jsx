import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutSuccess } from "../../redux/userRedux";
import "./header.css";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("persist:root");
    dispatch(logoutSuccess());
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <nav
      id="navbarExample"
      className="navbar navbar-expand-lg fixed-top navbar-light top-nav-collapse"
      aria-label="Main navigation"
    >
      <div className="container">
        <NavLink className="navbar-brand logo-image" to="home">
          <img src={logo} alt="alternative" />
        </NavLink>

        <button
          className="navbar-toggler p-0 border-0"
          type="button"
          id="navbarSideCollapse"
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={
            isOpen
              ? "navbar-collapse offcanvas-collapse open"
              : "navbar-collapse offcanvas-collapse"
          }
          id="navbarsExampleDefault"
        >
          <ul className="navbar-nav ms-auto navbar-nav-scroll">
            <li
              className="nav-item"
              onClick={() => {
                const anchor = document.querySelector("#header");
                anchor?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              <NavLink
                className={(navClass) =>
                  navClass.isActive ? "nav-link active" : "nav-link"
                }
                to="home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navClass) =>
                  navClass.isActive ? "nav-link active" : "nav-link"
                }
                to="books"
              >
                Bibliothèque
              </NavLink>
            </li>
            {!user && (
              <li
                className="nav-item"
                onClick={() => {
                  const anchor = document.querySelector("#services");
                  anchor?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <NavLink
                  className={(navClass) =>
                    navClass.location === "#services"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="home#services"
                >
                  Services
                </NavLink>
              </li>
            )}
            {!user && (
              <li
                className="nav-item"
                onClick={() => {
                  const anchor = document.querySelector("#details");
                  anchor.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <NavLink
                  className={(navClass) =>
                    navClass.location === "home#details"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="home#details"
                >
                  Ce Que Nous Faisons
                </NavLink>
              </li>
            )}
            {!user && (
              <li
                className="nav-item"
                onClick={() => {
                  const anchor = document.querySelector("#details-1");
                  anchor.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <NavLink
                  className={(navClass) =>
                    navClass.location === "#details-1"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="home#details-1"
                >
                  A Propos De Nous
                </NavLink>
              </li>
            )}
            {user?.isAdmin && (
              <li className="nav-item">
                <NavLink
                  className={(navClass) =>
                    navClass.isActive ? "nav-link active" : "nav-link"
                  }
                  to="booksList"
                >
                  Gérer la bibliothèque
                </NavLink>
              </li>
            )}
            {user?.isAdmin && (
              <li className="nav-item">
                <NavLink
                  className={(navClass) =>
                    navClass.isActive ? "nav-link active" : "nav-link"
                  }
                  to="users"
                >
                  Gérer les utilisateurs
                </NavLink>
              </li>
            )}
          </ul>
          {user ? (
            <span className="nav-item" onClick={logout}>
              <NavLink className="btn-solid-sm" to="login">
                Logout
              </NavLink>
            </span>
          ) : (
            <span className="nav-item">
              <NavLink className="btn-solid-sm" to="login">
                Login
              </NavLink>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

// {

//   const user = useSelector((state) => state.user.currentUser);
//   const navigate = useNavigate()
//   const headerRef = useRef(null)
//   const menuRef = useRef(null)
//   const dispatch = useDispatch()
//   const profileActionRef = useRef(null)

//   const stickyHeaderFunc = ()=>{
//     window.addEventListener('scroll', ()=>{
//       if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
//         headerRef.current.classList.add('sticky__header');
//       } else{
//         headerRef.current.classList.remove('sticky__header');
//       }
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem('persist:root');
//     dispatch(logoutSuccess());
//     toast.success('Logged out')
//     navigate('/login');
//   }

//   useEffect(()=>{
//     stickyHeaderFunc();
//     return ()=> window.removeEventListener('scroll', stickyHeaderFunc)
//   });

//   const menuToggle = ()=> menuRef.current.classList.toggle('active__menu')

//   const toggleProfileActions = ()=> profileActionRef.current.classList.toggle('show__profileActions')

//   return (
//     <header className="header" ref={headerRef}>
//       <ToastContainer />
//       <Container>
//         <Row>
//           <div className="nav__wrapper">
//             <div className="logo">
//               <img src={logo} alt='logo' />
//               <div>
//                 <h1 className='text-success'>Aliaaf</h1>
//               </div>
//             </div>
//             <div className="navigation" ref={menuRef} onClick={menuToggle}>
//               <ul className="menu">
//                 {
//                   nav__links.map((item, index) =>(
//                     <li className="nav__item" key={index}>
//                       <NavLink
//                         to={item.path}
//                         className={(navClass)=> navClass.isActive ? 'nav__active' : ''}
//                       >
//                         {item.display}
//                       </NavLink>
//                     </li>
//                   ))
//                 }
//               </ul>
//             </div>
//             <div className="nav__icons">
//               <div className='profile'>
//                 <span>{user ? user.username :'Not logged'} </span>
//                 <motion.img
//                   whileTap={{ scale: 1.2 }}
//                   src={userIcon}
//                   alt=''
//                   onClick={toggleProfileActions}
//                 />
//                 <div
//                   className="profile__actions hide__profileActions"
//                   ref={profileActionRef}
//                   onClick={toggleProfileActions}
//                 >
//                   {
//                     user ? (
//                       <div className='d-flex align-items-center justify-content-center flex-column'>
//                         <span onClick={logout}>Logout</span>
//                         {
//                           user.isAdmin && (
//                             <>
//                             <Link to='/booksList'>Books List</Link>
//                             <Link to='/users'>Users</Link>
//                             </>
//                           )
//                         }
//                       </div>
//                     ) : (
//                       <div className='d-flex align-items-center justify-content-center flex-column'>
//                         <Link to='/login'>Login</Link>
//                       </div>
//                     )
//                   }
//                 </div>
//               </div>
//               <div className="mobile__menu">
//                 <span onClick={menuToggle}>
//                   <i className="ri-menu-line"></i>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </header>
//   )
// }

export default Header;
