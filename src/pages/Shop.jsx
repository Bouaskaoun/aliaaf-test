import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row } from "reactstrap";

import ProductsList from "../components/UI/ProductsList";
import { publicRequest } from "../requestMethods";
import "../styles/shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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

  // const handleFilter = (value) => {
  //   if(value === 'reset'){
  //     setProductsData(products)
  //   }
  //   else{
  //     const filterProducts = products.filter(item => item.category === value)
  //     setProductsData(filterProducts)
  //   }
  // }

  // const handleSort = (e) => {
  //   const sortValue = e.target.value
  //   if(sortValue === 'ascending'){
  //     const sortedProducts = [...products].sort((a, b) => a.title > b.title ? 1 : -1)
  //     setProductsData(sortedProducts)
  //   }
  //   if(sortValue === 'descending'){
  //     const sortedProducts = [...products].sort((a, b) => a.title > b.title ? -1 : 1)
  //     setProductsData(sortedProducts)
  //   }
  //   if(sortValue === 'reset'){
  //     setProductsData(products)
  //   }
  // }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchProducts = products.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductsData(searchProducts);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilter = (value) => {
    if (value === "reset") {
      setProductsData(products);
    } else {
      const filterProducts = products.filter((item) => item.category === value);
      setProductsData(filterProducts);
    }
    setShowFilters(false);
  };

  return (
    <Helmet title="Books">
      <section className="section biblio">
        <div className="container">
          <div className="row">
            <div className="bac">
              <div className="text-container">
                <h1 className="h1-large">ALIAAF BIBLIOTHÈQUE</h1>
                <p className="p-large">
                  Association des Ingénieurs Agroalimentaires Lauréats de la Fst
                  de Fès
                </p>
                <div className="search__box">
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                </div>
                <button className="btn-solid-lg" onClick={toggleFilters}>
                  filtrer par catégorie
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="filters">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="filter">
                      <div className="filter-icon bg-4">
                        <i className="fas fa-dot-circle"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("reset")}
                        >
                          Tous les Documents
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-1">
                        <i
                          className="fas fa-gavel"
                          onClick={() => handleFilter("Textes_réglementaires")}
                        ></i>
                      </div>
                      <div className="filter-body">
                        <h5 className="filter-title">Textes réglementaires</h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-2">
                        <i className="fas fa-graduation-cap"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("PFE")}
                        >
                          PFE
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-3">
                        <i className="fas fa-gear"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() =>
                            handleFilter("Management_de_la_Production")
                          }
                        >
                          Management de la Production
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-4">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("Articles_scientifiques")}
                        >
                          Articles scientifiques
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-5">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("Normes_marocaines")}
                        >
                          Normes marocaines
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-1">
                        <i className="fas fa-cogs"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() =>
                            handleFilter("Insertion_professionnells")
                          }
                        >
                          Insertion professionnelle
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-2">
                        <i className="fas fa-clipboard"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() =>
                            handleFilter("Anciens_concours_de_l'Etat")
                          }
                        >
                          Anciens concours de l'Etat
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-3">
                        <i className="fas fa-file-medical"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("QHSE")}
                        >
                          QHSE
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-4">
                        <i className="fas fa-folder"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("Normes_et_référentiels")}
                        >
                          Normes et référentiels
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-5">
                        <i className="fas fa-list-check"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("Gestion_de_projet")}
                        >
                          Gestion de projet
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-1">
                        <i className="fas fa-industry"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() =>
                            handleFilter("Procédés_de_fabrication")
                          }
                        >
                          Procédés de fabrication
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-2">
                        <i className="fas fa-cogs"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("MSDA")}
                        >
                          MSDA
                        </h5>
                      </div>
                    </div>

                    <div className="filter">
                      <div className="filter-icon bg-3">
                        <i className="fas fa-thumbs-up"></i>
                      </div>
                      <div className="filter-body">
                        <h5
                          className="filter-title"
                          onClick={() => handleFilter("GBPF")}
                        >
                          GBPF
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="biblio pt-5">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No books are found</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
