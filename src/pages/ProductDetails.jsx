import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion';

import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import ProductsList from '../components/UI/ProductsList';

import { publicRequest } from '../requestMethods';
import '../styles/product-details.css';


const ProductDetails = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const {id} = useParams()
  const product = products.find(item => item._id === id)
  
  const relatedProducts = products.filter(item => item.category === product?.category)

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  return (
    <Helmet title = {product?.title}>
      <CommonSection title = {product?.title} />
      {
        loading ? (
          <Col lg='12' className='text-center mt-5 mb-5'>
            <h5 className='fw-bold'>Loading...</h5>
          </Col>
          ) : (
            <>
              <section className='pt-0'>
                <Container>
                  <Row>
                    <Col lg='6'>
                      <img src={product?.img} alt="" />
                    </Col>
                    <Col lg='6'>
                      <div className="product__details mt-5">
                        <h2>{product?.title}</h2>
                        <div className="product__rating d-flex align-items-center gap-5 mb-3">
                        <p>Category: <span>{product?.category}</span></p>
                        </div>
                        <div className="d-flex align-items-center gap-5">
                          <span className='product__price'>{product?.author}</span>
                        </div>
                        <p className='mt-3'>{product?.desc}</p>
                        <motion.button 
                          whileTap={{ scale: 1.2 }}
                          className='buy__btn'
                          onClick={() => openInNewTab(product?.pdf)}
                        >
                          Download
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
                        <p>{product?.desc}</p>
                      </div>
                    </Col>
                    <Col lg='12' className='mt-5 mb-5'>
                      <h2 className='related__title'>You might also like</h2>
                    </Col>
                    <ProductsList data={relatedProducts} />
                  </Row>
                </Container>
              </section>
            </>
            )
      }
    </Helmet>
  )
}

export default ProductDetails