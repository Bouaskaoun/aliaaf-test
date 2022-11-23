import React, { useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import ProductsList from '../components/UI/ProductsList';

import products from '../assets/data/products';
import '../styles/product-details.css';


const ProductDetails = () => {

  const {id} = useParams()
  const product = products.find(item => item.id === id)
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    description,
    shortDesc,
    category
  } = product

  const relatedProducts = products.filter(item => item.category === category)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title = {productName}>
      <CommonSection title = {productName} />
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg='6'>
              <div className="product__details mt-5">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-half-line"></i></span>
                  </div>
                  <p>(<span>{avgRating}</span>ratings)</p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className='product__price'>${price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className='mt-3'>{shortDesc}</p>
                <motion.button 
                  whileTap={{ scale: 1.2 }}
                  className='buy__btn'
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 
                  className='active__tab'
                >
                  Description
                </h6>
              </div>
              <div className="tab__content mt-5">
                <p>{description}</p>
              </div>
            </Col>
            <Col lg='12' className='mt-5 mb-5'>
              <h2 className='related__title'>You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails