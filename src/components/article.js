import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Image, Row} from "react-bootstrap";
import Footer from "./footer";
import { useParams, useNavigate} from "react-router-dom";
import {capitalize} from "./capitalize";
import {animationOnScroll} from "./animationOnScroll";

export default function Article() {
    const [post, setPost] = useState([]);
    const [fetching, setFetching] = useState(true)
    const { name } = useParams();
    const navigate = useNavigate();
    const getResult = async () => {
        const page = await axios.get('http://test.chakito.com/m/index.php/wp-json/wp/v2/pages?&slug='+ name);
        setPost(page.data);
        setFetching(false);
        if(page) {
            document.title = capitalize(name);
        }

    };
    useEffect(  () => {
        getResult();
        animationOnScroll();
    }, [fetching]);

    useEffect(()=> {
        if(post.length === 0 && fetching === false) {
            navigate("/404");
        }
    }, [post])

    return (
        <div>
            {post.map((i, index) => {
                return (
                    <div key={index}>
                        <div className={`${fetching === false ? "animation animation--left": ""} article my-5 `}>
                            <div className='content-container' key={index}>
                                {i.content.rendered ?
                                    <div className="modal-content-body p-0">
                                        <Container fluid="xl">
                                            <Row className='justify-content-center'>
                                                <Col sm={8} xs={12} dangerouslySetInnerHTML={ {__html: i.content.rendered} } />
                                            </Row>
                                        </Container>
                                    </div>
                                    : '' }

                            </div>
                            <Footer/>
                        </div>
                    </div>
                        )
            })}
        </div>
    );
};
