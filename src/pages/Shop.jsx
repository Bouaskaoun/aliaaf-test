import React, { useState, useEffect } from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firbase.config';

import '../styles/shop.css';
import ProductsList from '../components/UI/ProductsList';

const Shop = () => {

  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    async function fetchProducts() {
        const data = []
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });

        setProducts(data);
        setProductsData(data);
    }

    fetchProducts();
  }, []);

  const handleFilter = (e) => {
    const filterValue = e.target.value 
    if(filterValue === 'sofa'){
      const filtredProducts = products.filter(
        item => item.category === 'sofa'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'chair'){
      const filtredProducts = products.filter(
        item => item.category === 'chair'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'watch'){
      const filtredProducts = products.filter(
        item => item.category === 'watch'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'mobile'){
      const filtredProducts = products.filter(
        item => item.category === 'mobile'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'wireless'){
      const filtredProducts = products.filter(
        item => item.category === 'wireless'
      );
      setProductsData(filtredProducts)
    }
    if(filterValue === 'reset'){
      setProductsData(products)
    }
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value

    const searchProducts = products.filter(item => item.productName?.toLowerCase().includes(searchTerm.toLowerCase()))

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
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
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
                  <i class="ri-search-line"></i>
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