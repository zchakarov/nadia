import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Nav, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {scrolltop} from "./scrollTop";
import {animationOnScroll} from "./animationOnScroll";

export default function Footer() {
    const [ data , setData ] = useState([ ]);

    useEffect( () => {
        axios.get('http://chakito.com/blog/index.php/wp-json/menus/v1/menus/footer').then(res => {
            setData(res.data);
        });
    }, []);
    return (
        <div className="animation animation--bottom footer">
            <Container fluid="xl">
                <Row className='justify-content-center'>
                    <Col lg={10} sm={10}>
                        <Nav>
                            {data.items?
                                data.items.map((link, index) => (
                                    <Nav.Item key={index}>
                                        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
                                        to={{
                                            pathname: `/${link.slug}`
                                        }}
                                        >{link.title}</NavLink>
                                    </Nav.Item>
                                ))
                                : ''}
                        </Nav>
                    </Col>
                    <Col lg={4} md={4} sm={8}>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};
