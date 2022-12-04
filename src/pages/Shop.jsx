import React, { useState, useEffect } from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import '../styles/shop.css';
import ProductsList from '../components/UI/ProductsList';

const Shop = () => {

  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setProductsData(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const handleFilter = (e) => {
    const filterValue = e.target.value 
    if(filterValue === 'cat-1'){
      const filtredProducts = products.filter(
        item => item.category === 'cat-1'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'cat-2'){
      const filtredProducts = products.filter(
        item => item.category === 'cat-2'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'cat-3'){
      const filtredProducts = products.filter(
        item => item.category === 'cat-3'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'cat-4'){
      const filtredProducts = products.filter(
        item => item.category === 'cat-4'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'cat-4'){
      const filtredProducts = products.filter(
        item => item.category === 'cat-4'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'reset'){
      setProductsData(products)
    }
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value

    const searchProducts = products.filter(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchProducts)
  }


  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="reset">Filter By Category</option>
                  <option value="cat-1">cat-1</option>
                  <option value="cat-2">cat-2</option>
                  <option value="cat-3">cat-3</option>
                  <option value="cat-4">cat-4</option>
                  <option value="cat-4">cat-4</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input type="text" placeholder='Search...' onChange={handleSearch} />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {
              productsData.length === 0 ? (
                <h1 className='text-center fs-4'>No products are found</h1>
              ) : (
                <ProductsList data={productsData} />
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop