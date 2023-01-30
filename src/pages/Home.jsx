// import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col } from 'reactstrap';
// import {motion} from 'framer-motion';

// import ProductsList from '../components/UI/ProductsList';
// import Helmet from '../components/Helmet/Helmet';
// import '../styles/home.css';

// import heroImg from '../assets/images/ALIAAF_LOGO_575x434.png';
// import { publicRequest } from '../requestMethods';

// const Home = () => {

//   // const year = new Date().getFullYear();
//   const [products, setProducts] = useState([])
//   const [filterdProducts, setfilterdProducts] = useState([])

//   useEffect(() => {
//     // publicRequest.get('users').then(res => {
//     //   console.log(res.data);
//     // }).catch(err => {
//     //   // console.log(err);
//     //   localStorage.removeItem('persist:root');
//     // })

//     const getProducts = async () => {
//       try {
//         const res = await publicRequest.get("products");
//         setProducts(res.data);
//       } catch (err) {}
//     };
//     getProducts();
//   }, []);

//   useEffect(() => {
//     // console.log(products[Math.floor(Math.random() * products.length)]);
//     //const filterdCategoryProducts = products.filter(item => item.category === 'PFE');
//     //setfilterdProducts(filterdCategoryProducts);

//     // Get a random 10 values from the array
//     let randomValues = [];
//     let number = products.length >=10 ? 10 : products.length;
//     for (let i = 0; i < number; i++) {
//       // Generate a random index
//       let index = Math.floor(Math.random() * products.length);

//       // Get the value at the random index
//       let value = products[index];

//       // Add the value to the result array
//       randomValues.push(value);

//       // Remove the value from the original array
//       products.splice(index, 1);
//     }
//     setfilterdProducts(randomValues);
//     //console.log(randomValues);
//   }, [products]);

//   return (
//     <Helmet title={'Home'}>
//       <section className='hero__section'>
//         <Container>
//           <Row>
//             <Col lg='6' md='12'>
//               <div className="hero__content">
//                 <p className="hero__subtitle">Bienvenue à :</p>
//                 <h2>ALIAAF BIBLIOTHÈQUE</h2>
//                 <p>
//                   Chef Ingénieur, ALIAAF met à votre disposition une panoplie de collections cohérentes et
//                   représentatives dans le domaine des industries agroalimentaires (QHSE, management de la
//                   production, normes et référentiels...etc). Nous espérons que ces documents vous serons utiles dans
//                   votre parcours académique et professionnel.
//                 </p>
//                 <motion.button whileHover={{ scale: 1.1 }} className='buy__btn'>
//                   <Link to='/books'>Entrer</Link>
//                 </motion.button>
//               </div>
//             </Col>
//             <Col lg='6' md='12'>
//               <div className="hero__img">
//                 <img src={heroImg} alt="" />
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//       <section className='trending__products'>
//         <Container>
//           <Row>
//             <Col lg='12' className='text-center mb-5'>
//               <h2 className='section__title'>Books</h2>
//             </Col>
//             <ProductsList data={filterdProducts}/>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   )
// }

// export default Home

import React from "react";
import "../styles/home.css";
import unsplashImage from "../assets/images/unsplash-1.png";
import aliaafLogo from "../assets/images/ALIAAF LOGO.PNG";
import detailImage from "../assets/images/details-1.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header id="header" className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-5">
              <div className="text-container">
                <h1 className="h1-large">ALIAAF BIBLIOTHÈQUE</h1>
                <p className="p-large">
                  Association des Ingénieurs Agroalimentaires Lauréats de la Fst
                  de Fès
                </p>
                <NavLink className="btn-solid-lg" to="/books">
                  Bibliothèque
                </NavLink>
              </div>
            </div>
            <div className="col-lg-6 col-xl-7">
              <div className="image-container">
                <img
                  className="img-fluid"
                  src={unsplashImage}
                  alt="alternative"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="services" className="cards-1 bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Nos services</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-icon">
                  <span className="fas fa-headphones-alt"></span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Analyse your product</h5>
                  <p>
                    Et blandit nisl libero at arcu. Donec ac lectus sed tellus
                    mollis viverra. Nullam pharetra ante at nunc elementum
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-icon red">
                  <span className="far fa-clipboard"></span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Evaluate opportunities</h5>
                  <p>
                    Vulputate nibh feugiat. Morbi pellent diam nec libero
                    lacinia, sed ultrices velit scelerisque. Nunc placerat justo
                    sem
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-icon green">
                  <span className="far fa-comments"></span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Find the influencers</h5>
                  <p>
                    Ety suscipit metus sollicitudin euqu isq imperdiet nibh nec
                    magna tincidunt, nec pala vehicula neque sodales verum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="details" className="basic-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-7">
              <div className="image-container">
                <img
                  className="img-fluid"
                  src={detailImage}
                  alt="alternative"
                />
              </div>
            </div>
            <div className="col-lg-6 col-xl-5">
              <div className="text-container">
                <div className="section-title">CE QUE NOUS FAISONS</div>
                <h2>Ressources pour les industries agroalimentaires</h2>
                <p>
                  Chef Ingénieur, ALIAAF met à votre disposition une panoplie de
                  collections cohérentes et représentatives dans le domaine des
                  industries agroalimentaires (QHSE, management de la
                  production, normes et référentiels...etc). Nous espérons que
                  ces documents vous serons utiles dans votre parcours
                  académique et professionnel.
                </p>
                <NavLink className="btn-solid-reg" to="/books">
                  Bibliothèque
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="details-1" className="basic-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-5">
              <div className="text-container">
                <div className="section-title">À PROPOS DE NOUS</div>
                <h2>
                  Une collection complète pour les industries agroalimentaires
                </h2>
                <p>
                  ALIAAF Bibliothèque est un produit de l'association ALIAAF qui
                  met à votre disposition une panoplie de collections cohérentes
                  et représentatives dans le domaine des industries
                  agroalimentaires (QHSE, management de la production, normes et
                  référentiels...etc). Nous espérons que ces documents vous
                  serons utiles dans votre parcours académique et professionnel.
                </p>
                <NavLink className="btn-outline-reg" to="books">
                  Details
                </NavLink>
              </div>
            </div>
            <div className="col-lg-6 col-xl-7">
              <div className="image-container">
                <img className="img-fluid" src={aliaafLogo} alt="alternative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
