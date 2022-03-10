import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Nav, Row, Image} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {animationOnScroll} from "./animationOnScroll";
export default function Home() {
    const [ data , setData ] = useState([]);
    const [fetching, setFetching] = useState(true);
    useEffect( () => {
        axios.get('http://test.chakito.com/m/index.php/wp-json/wp/v2/pages?per_page=20').then(res => {
            setData(res.data.filter(function(value)  {
                return value.parent !== 0;
                setFetching(false)
            }));
        });
        animationOnScroll();
    }, []);
    useEffect( ()=> {
        if(data.length > 0) {
            document.title = "Startseite";

        }

    }, [data]);

    return (
        <div className="content--container">
            <Container fluid="xl">
                <Row className='pt-3 pb-3 justify-content-center align-items-center'>
                    <Col xs={10} sm={6} md={6} xl={6} className="first-col p-3 p-m-0 mx-5 mb-5">
                        <div className=" border-radius-test">
                            <Image src="/header.png" className="animation animation--zoom--out img-fluid image "/>
                        </div>
                    </Col>
                </Row>
                <Row className='pt-3 py-5 my-5 justify-content-center align-items-center'>
                {data?
                    data.map((cat, index) => (
                        <Col key={cat.id} lg={3} md={3} sm={5} xs={12} className="animation animation--top category p-0">
                            <Link to={`/${cat.acf.categoryname}/${cat.slug}`}>
                                {cat.x_featured_media_large ?
                                    <div className="background image--container"
                                         style={{ backgroundImage: `url(${cat.x_featured_media_large}`}} />
                                : <div className="background image--container" />
                                }

                                <h4 className="headline">
                                    {cat.title.rendered}
                                    <span>
                                        <h5 className="m-0">
                                            {cat.acf.categoryname === "madchen" ? "Mädchen" : cat.acf.categoryname}
                                        </h5>
                                    </span>
                                </h4>
                            </Link>
                        </Col>
                    ))
                    : ''}
                </Row>
            </Container>
        </div>
    );
};
