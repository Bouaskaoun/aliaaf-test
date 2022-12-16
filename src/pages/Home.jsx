import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {motion} from 'framer-motion';

import ProductsList from '../components/UI/ProductsList';
import Services from '../services/Services';
import Helmet from '../components/Helmet/Helmet';
import '../styles/home.css';

import heroImg from '../assets/images/ALIAAF_LOGO_575x434.png';
import { publicRequest } from '../requestMethods';

const Home = () => {

  const year = new Date().getFullYear();
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

  useEffect(()=>{
    const filterdCategoryProducts = products.filter(item => item.category === 'PFE');
    setfilterdProducts(filterdCategoryProducts);
  }, [products]);

  return (
    <Helmet title={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ducimus illo optio voluptas laudantium harum sit blanditiis! Corporis, obcaecati quaerat?</p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'>
                  <Link to='/shop'>BOOKS</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
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