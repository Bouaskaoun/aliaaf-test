import React from "react";
import "./footer.css";

import logo from "../../assets/images/logo-footer.svg";
//import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-col first">
                <a href="index.html">
                  <img className="logo-image" src={logo} alt="alternative" />
                </a>
                <p className="p-small">
                  Association des Lauréats Ingénieurs Agroalimentaires de la FST
                  de Fes.
                </p>
              </div>
              <div className="footer-col second">
                <h6>Contact</h6>
                <ul className="list-unstyled li-space-lg p-small">
                  {/* <li className="p-small">
                    <i className="fas fa-phone-alt"></i>+80 90 90 90 123
                  </li> */}
                  <li className="p-small">
                    <i className="fas fa-envelope"></i>
                    <a
                      className="noline"
                      href="mailto:Aliaaf.contact@gmail.com"
                    >
                      Aliaaf.contact@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col third">
                <h6>Social</h6>
                <span className="fa-stack">
                  <a href="https://www.facebook.com/aliaaf.association">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-facebook-f fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-twitter fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-linkedin fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="https://www.instagram.com/aliaaf.association">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-instagram fa-stack-1x"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="p-small">
                Copyright @ {year} Aliaaf |{" "}
                <a className="noline" href="https://aliaaf.com/">
                  Aliaaf
                </a>{" "}
                |{" "}
                <a className="noline" href="https://fst-usmba.ac.ma/">
                  FST Fes
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
