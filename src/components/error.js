import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate, Navigate} from "react-router-dom";
import {Loading} from "./loading";
import {capitalize} from "./capitalize";


export default function Error() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    if(location.state && location.state.length === 0 ) {
        document.title = "Nadia // 404";

    }

        return (

        <div>
            <div>
                <div className='content-container error'>
                    <Container fluid="xl" className="animation animation--bottom error--container">
                        <Row>
                            <Col lg={12}>
                                <h1>404 Error</h1>
                                <h3 onClick={()=> navigate(-2)} className="link m-0 align-self-center">Geh zurück zur Startseite</h3>
                            </Col>
                        </Row>
                    </Container>

                </div>


            </div>

        </div>
    )
};
