import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col } from 'reactstrap';
import {motion} from 'framer-motion';
import '../../styles/product-card.css';


const ProductCard = ({ item }) => {

    const navigate = useNavigate()

  return (
    <Col lg='3' md='4' className="mb-2">
        <div className="product__item">
            <div className="product__img" onClick={()=> navigate(`/shop/${item._id}`)}>
                <motion.img whileHover={{ scale: 0.9 }} src={item.img} alt="" />
            </div>
            <div className="p-2 product__info">
                <h3 className='product__name'>
                    {item.title}
                    {/* <Link to={`/shop/${item._id}`}>{item.title}</Link> */}
                </h3>
                <span>{item.category}</span>
            </div>
            <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                <span className='price'>{item.author}</span>
                <motion.span whileTap={{ scale: 1.2 }} >
                    <i className="ri-download-line"></i>
                </motion.span>
            </div>
        </div>
    </Col>
  )
}

export default ProductCard