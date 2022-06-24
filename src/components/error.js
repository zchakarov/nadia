import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate, Navigate} from "react-router-dom";
import {Loading} from "./loading";
import {capitalize} from "./capitalize";
import Footer from "./footer";
import {scrolltop} from "./scrollTop";
import {animationOnScroll} from "./animationOnScroll";


export default function Error() {
    const navigate = useNavigate();
    const location = useLocation();
    if(location.state && location.state.length === 0 ) {
        document.title = "Nadia // 404";

    }

        return (

        <div>
            <div className="footerBottom">
                <div className='content-container error'>
                    <Container fluid="xl" className="animation animation--bottom error--container">
                        <Row>
                            <Col lg={12}>
                                <h1>404 Error</h1>
                                <h3 onClick={()=> {
                                    navigate('/')
                                    animationOnScroll();
                                } } className="link m-0 align-self-center">Geh zurück</h3>
                            </Col>
                        </Row>
                    </Container>

                </div>
                <Footer/>

            </div>

        </div>
    )
};
