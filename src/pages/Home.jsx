import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {motion} from 'framer-motion';

import ProductsList from '../components/UI/ProductsList';
import Helmet from '../components/Helmet/Helmet';
import '../styles/home.css';

import heroImg from '../assets/images/ALIAAF_LOGO_575x434.png';
import { publicRequest } from '../requestMethods';

const Home = () => {

  // const year = new Date().getFullYear();
  const [products, setProducts] = useState([])
  const [filterdProducts, setfilterdProducts] = useState([])

  useEffect(() => {
    // publicRequest.get('users').then(res => {
    //   console.log(res.data);
    // }).catch(err => {
    //   // console.log(err);
    //   localStorage.removeItem('persist:root');
    // })

    const getProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  useEffect(() => {
    // console.log(products[Math.floor(Math.random() * products.length)]);
    //const filterdCategoryProducts = products.filter(item => item.category === 'PFE');
    //setfilterdProducts(filterdCategoryProducts);

    // Get a random 10 values from the array
    let randomValues = [];
    let number = products.length >=10 ? 10 : products.length;
    for (let i = 0; i < number; i++) {
      // Generate a random index
      let index = Math.floor(Math.random() * products.length);

      // Get the value at the random index
      let value = products[index];

      // Add the value to the result array
      randomValues.push(value);

      // Remove the value from the original array
      products.splice(index, 1);
    }
    setfilterdProducts(randomValues);
    //console.log(randomValues);
  }, [products]);

  return (
    <Helmet title={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='12'>
              <div className="hero__content">
                <p className="hero__subtitle">Bienvenue à :</p>
                <h2>ALIAAF BIBLIOTHÈQUE</h2>
                <p>
                  Chef Ingénieur, ALIAAF met à votre disposition une panoplie de collections cohérentes et
                  représentatives dans le domaine des industries agroalimentaires (QHSE, management de la
                  production, normes et référentiels...etc). Nous espérons que ces documents vous serons utiles dans
                  votre parcours académique et professionnel.
                </p>
                <motion.button whileHover={{ scale: 1.1 }} className='buy__btn'>
                  <Link to='/books'>Entrer</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='trending__products'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Products</h2>
            </Col>
            <ProductsList data={filterdProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home