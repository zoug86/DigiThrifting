import React from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact"
import '../styles/footer.css'
const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className="footer-title">Brands</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Apple</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Samsung</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Top Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Frequently asked questions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className="footer-title">Company</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Job postings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">News and articles</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className="footer-title">Contact & Support</span>
                            </li>
                            <li className="nav-item">
                                <span style={{ color: '#fec503' }} className="nav-link"><i className="fas fa-phone"></i>+1 778 318 7601</span>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-comments"></i>Live chat</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-envelope"></i>Contact us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-star"></i>Give feedback</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <p style={{ color: '#fec503', marginTop: '3rem' }}><i className="fas fa-map-marker-alt"></i> 3837 Midgard Place, Victoria, BC, V8P 2Z1</p>
                <div className="text-center"><i className="fas fa-ellipsis-h"></i></div>

                <div className="row text-center">
                    <div className="col-md-4 box">
                        <span className="copyright quick-links">Copyright &copy; DigiThrifting ~ {new Date().getFullYear()}
                        </span>
                    </div>
                    <div className="col-md-4 box">
                        <ul className="list-inline social-buttons">
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 box">
                        <ul className="list-inline quick-links">
                            <li className="list-inline-item">
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
