import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useParams, useNavigate, Navigate} from "react-router-dom";
import {Loading} from "./loading";
import {capitalize} from "./capitalize";


export default function Error() {
    const navigate = useNavigate();
    document.title = "404";

    return (

        <div>
            <div>
                <div className='content-container error'>
                    <Container fluid="xl" className="animation animation--bottom error--container">
                        <Row>
                            <Col lg={12}>
                                <h1>404 Error</h1>
                                <h3 onClick={()=> navigate(-2)} className="link m-0 align-self-center">Geh zurück</h3>
                            </Col>
                        </Row>
                    </Container>

                </div>


            </div>

        </div>
    )
};
