import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col } from 'reactstrap';
import {motion} from 'framer-motion';
import '../../styles/product-card.css';


const ProductCard = ({ item }) => {

    const navigate = useNavigate()

  return (
    <Col lg='3' md='4' className="mb-2">
        <div className="product__item" onClick={()=> {
                navigate(`/books/${item._id}`)
                window.location.reload(false)
                }}>
            <div className="product__img">
                <motion.img whileHover={{ scale: 0.9 }} src={item.img} alt="" />
            </div>
            <div className="p-2 product__info">
                <h3 className='product__name'>
                    {item.title.length < 17 ? item.title : item.title.substring(0, 14) + '...'}
                    {/* <Link to={`/shop/${item._id}`}>{item.title}</Link> */}
                </h3>
                <span>{item.category.length < 14 ? item.category : item.category.substring(0,12) + '...'}</span>
            </div>
            <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                <span className='price'>{item.author.length < 14 ? item.author : item.author.substring(0,12) + '...'}</span>
                {/* <motion.span whileTap={{ scale: 1.2 }} >
                    <i className="ri-download-line"></i>
                </motion.span> */}
            </div>
        </div>
    </Col>
  )
}

export default ProductCard