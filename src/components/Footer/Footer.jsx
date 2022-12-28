import React from 'react';
import './footer.css'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
//import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='6' md='12' className='mb-4'>
            <div className="logo">
              <div>
                <h1 className='text-white'>ALIAAF</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              ALIAAF Bibliothèque est un produit de l'association ALIAAF qui met à votre disposition une panoplie
              de collections cohérentes et représentatives dans le domaine des industries agroalimentaires (QHSE,
              management de la production, normes et référentiels...etc). Nous espérons que ces documents vous
              serons utiles dans votre parcours académique et professionnel.
            </p>
          </Col>
          {/* <Col lg='3' md='3' className='mb-4'>
            <div className="footer__quick-links">
              <h4 className='quick__links-title'>Quick Links</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Products</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col> */}
          <Col lg='2' md='3' className='mb-4'>
            <div className="footer__quick-links">
              <h4 className='quick__links-title'>Useful Links</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <a href='https://aliaaf.com' target='_blank' rel='noreferrer'>Aliaaf</a>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <a href='https://fst-usmba.ac.ma' target='_blank' rel='noreferrer'>FST Fes</a>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <a href='https://www.facebook.com/aliaaf.association' target='_blank' rel='noreferrer'>
                    <i className='ri-facebook-line'></i>
                  </a>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <a href='https://www.instagram.com/aliaaf.association' target='_blank' rel='noreferrer'>
                    <i className='ri-instagram-line'></i>
                  </a>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='4' md='8'>
            <div className="footer__quick-links">
              <h4 className='quick__links-title'>Contact</h4>
              <ListGroup className='footer__conatct mb-3'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span>
                    <i className='ri-mail-line'></i>
                  </span>
                  <p>Aliaaf.contact@gmail.com</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span>
                    <i className='ri-phone-line'></i>
                  </span>
                  <p>+212 676 289 544</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span>
                    <i className='ri-map-pin-line'></i>
                  </span>
                  <p>Faculté des Sciences et Techniques de Fès B.P. 2202 - Route d'Imouzzer, Fes</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className="footer__copyright">
              <i className="ri-copyright-line"></i> {year} Association des Lauréats Ingénieurs Agroalimentaires de la FST de Fes. Tous droits réservés.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer