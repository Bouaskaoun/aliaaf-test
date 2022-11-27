import React, { useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firbase.config';

import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import ProductsList from '../components/UI/ProductsList';

import '../styles/product-details.css';


const ProductDetails = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
        const data = []
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });

        setProducts(data);
    }

    fetchProducts();
  }, []);

  const {id} = useParams()
  console.log(id)
  const product = products.find(item => item.id === id)
  
  const relatedProducts = products.filter(item => item.category === product?.category)

  const addToCart = () => {
    toast.success('Product added successfully')
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  return (
    <Helmet title = {product?.productName}>
      <CommonSection title = {product?.productName} />
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={product?.imgUrl} alt="" />
            </Col>
            <Col lg='6'>
              <div className="product__details mt-5">
                <h2>{product?.productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-half-line"></i></span>
                  </div>
                  <p>(<span>{product?.avgRating}</span>ratings)</p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className='product__price'>${product?.price}</span>
                  <span>Category: {product?.category}</span>
                </div>
                <p className='mt-3'>{product?.shortDesc}</p>
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
                <p>{product?.description}</p>
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