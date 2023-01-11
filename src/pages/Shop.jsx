import React, { useState, useEffect } from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';

import ProductsList from '../components/UI/ProductsList';
import { publicRequest } from '../requestMethods';
import '../styles/shop.css';

const Shop = () => {

  const [products, setProducts] = useState([])
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setProducts(res.data);
        setProductsData(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const handleFilter = (value) => {
    if(value === 'reset'){
      setProductsData(products)
    }
    else{
      const filterProducts = products.filter(item => item.category === value)
      setProductsData(filterProducts)
    }
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value

    const searchProducts = products.filter(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchProducts)
  }

  const handleSort = (e) => {
    const sortValue = e.target.value
    if(sortValue === 'ascending'){
      const sortedProducts = [...products].sort((a, b) => a.title > b.title ? 1 : -1)
      setProductsData(sortedProducts)
    }
    if(sortValue === 'descending'){
      const sortedProducts = [...products].sort((a, b) => a.title > b.title ? -1 : 1)
      setProductsData(sortedProducts)
    }
    if(sortValue === 'reset'){
      setProductsData(products)
    }
  }

  return (
    <Helmet title='Books'>
      <CommonSection title='Books' />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <select onChange={e => handleFilter(e.target.value)}>
                  <option value="reset">Filter By Category</option>
                  <option value="Textes_réglementaires">Textes réglementaires</option>
                  <option value="PFE">PFE</option>
                  <option value="Management_de_la_Production">Management de la Production</option>
                  <option value="Articles_scientifiques">Articles scientifiques</option>
                  <option value="Techniques_de_l'ingénieur">Techniques de l'ingénieur</option>
                  <option value="Normes_marocaines">Normes marocaines</option>
                  <option value="Insertion_professionnells">Insertion professionnells</option>
                  <option value="Anciens_concours_de_l'Etat">Anciens concours de l'Etat</option>
                  <option value="QHSE">QHSE</option>
                  <option value="Normes_et_référentiels">Normes et référentiels</option>
                  <option value="Gestion_de_projet">Gestion de projet</option>
                  <option value="Procédés_de_fabrication">Procédés de fabrication</option>
                  <option value="MSDA">MSDA</option>
                  <option value="GBPF">GBPF</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className="filter__widget">
                <select onChange={handleSort}>
                  <option value="reset">Sort By</option>
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
                <h1 className='text-center fs-4'>No books are found</h1>
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