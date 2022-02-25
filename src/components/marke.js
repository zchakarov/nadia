import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useParams, useNavigate, Navigate} from "react-router-dom";
import {Loading} from "./loading";
import {scrolltop} from "./scrollTop";
import {animationOnScroll} from "./animationOnScroll";


export default function Marke() {
    const [portfolio, setPortfolio] = useState([]);
    const [fetching, setFetching] = useState(true);
    const { name } = useParams();
    const navigate = useNavigate()



    useEffect(  () => {
        animationOnScroll();
    })
    useEffect(  () => {
        const getResults = async () => {
            const portfolio = await axios('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?');
            setPortfolio(portfolio.data.filter(
                function(element){
                    return element.acf.hersteller.toLowerCase() == name.toLowerCase();
                }
            ));

            setFetching(false);
        }
        getResults();
        scrolltop();

        document.title = name;
        if(portfolio.length === 0 && fetching === false) {
            navigate("/404");
        }
    }, [fetching]);


    return (

        <div>
            <div>
                <div className='content-container'>
                    <Container fluid="xl">
                        {fetching
                            ? <Loading text='Loading'/>
                            : <Row className="posts--grid justify-content-center">
                                {portfolio.map((i)=> {
                                    if(i.status === 'publish') {
                                        return (
                                            <Col key={i.id} className="posts--grid--element" lg={3} md={4} sm={5} xs={8}>
                                                <Link to={`/${i.post_terms[0].slug}/${i.slug}`} className="image-box">
                                                    <div className="thumbnail">
                                                        <img className="img-fluid"
                                                             src={i._embedded['wp:featuredmedia'][0].media_details.sizes.gridelement.source_url}
                                                             alt={i.title.rendered}/>
                                                    </div>
                                                    <div className="headline my-3">
                                                        {i.acf.hersteller?
                                                            <h4 className="m-0">{i.acf.hersteller}</h4>:
                                                            ''
                                                        }
                                                        <h2 className="m-0">{i.title.rendered}</h2>
                                                        {i.acf.Preis?
                                                            <h4 className="m-0 preis">{i.acf.Preis}€</h4>:
                                                            ''
                                                        }
                                                    </div>
                                                </Link>
                                            </Col>
                                        )
                                    }
                                })}

                            </Row>
                        }
                    </Container>

                </div>


            </div>

        </div>
    )
};
