import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

import ProductsList from '../components/UI/ProductsList';
import Services from '../services/Services';
import Helmet from '../components/Helmet/Helmet';
import '../styles/home.css';

import { Container, Row, Col } from 'reactstrap';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase.config';

import heroImg from '../assets/images/ALIAAF_LOGO_575x434.png';

const Home = () => {

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])
  const year = new Date().getFullYear();
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
        const data = []
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });

        setProducts(data);
    }

    fetchProducts();
  }, []);

  useEffect(()=>{
    const filterdTrendingProducts = products.filter(
      item => item.category === 'chair'
    );
    const filterdBestSalesProducts = products.filter(
      item => item.category === 'sofa'
    );
    const filterdMobileProducts = products.filter(
      item => item.category === 'mobile'
    );
    const filterdWirelessProducts = products.filter(
      item => item.category === 'wireless'
    );
    const filterdPopularProducts = products.filter(
      item => item.category === 'watch'
    );
    setTrendingProducts(filterdTrendingProducts)
    setBestSalesProducts(filterdBestSalesProducts)
    setMobileProducts(filterdMobileProducts)
    setWirelessProducts(filterdWirelessProducts)
    setPopularProducts(filterdPopularProducts)
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
            <ProductsList data={trendingProducts}/>
          </Row>
        </Container>
      </section>
      <section className='best__sales'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Category 1</h2>
            </Col>
            <ProductsList data={bestSalesProducts}/>
          </Row>
        </Container>
      </section>
      <section className='new__arrivals'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Category 2</h2>
            </Col>
            <ProductsList data={mobileProducts} />
            <ProductsList data={wirelessProducts} />
          </Row>
        </Container>
      </section>
      <section className='popular__category'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Popular in Category</h2>
            </Col>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home