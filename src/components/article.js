import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Image, Row, Tabs, Tab} from "react-bootstrap";
import Footer from "./footer";
import { useParams, useNavigate} from "react-router-dom";
import {capitalize} from "./capitalize";
import {animationOnScroll} from "./animationOnScroll";
import {scrolltop} from "./scrollTop";
import {Loading} from "./loading";
import Error from "./error";
export default function Article() {
    const [post, setPost] = useState([]);
    const [translatedPost, setTranslatedPost] = useState([]);
    const [fetching, setFetching] = useState(true)
    const { name } = useParams();
    const navigate = useNavigate();
    const getResult = async () => {
        const page = await axios.get('http://test.chakito.com/m/index.php/wp-json/wp/v2/pages?&slug='+ name);
        setPost(page.data);
        setFetching(false);


    };

    const translatePost = async () => {
        const translated = await axios.get(`http://test.chakito.com/m/index.php/wp-json/wp/v2/pages?&slug=${name}-griechisch`);
        setTranslatedPost(translated.data);
    }

    if(post.length > 0 && fetching == true) {
        document.title=`Nadia // ${capitalize(post[0].title.rendered)}`;

    }
    useEffect(  () => {
        getResult();
        scrolltop();

    }, [fetching]);
    useEffect(()=>{
        animationOnScroll();

    })
    useEffect(()=> {
       if(post.length === 0 && fetching === false) {
        document.title = "Nadia // 404";
        }
    }, [post])

    useEffect( ()=> {
        if(post.length !== 0) {
            if(post[0].acf.ubersetzt === true) {
                translatePost();
            }
        }

    }, [post]

    )

    return (
        <div>
            {(post.length > 0 && fetching === false) ? post.map((i, index) => {
                return (
                    <div key={index}>
                        <div className="footerBottom ">
                            <div className={`${fetching === false ? "animation animation--left": ""} content-container article`} key={index}>
                                {i.content.rendered ?
                                    <div className="modal-content-body p-0">
                                        <Container fluid="xl">
                                            <Row className='flex-column justify-content-center align-items-center'>
                                                {i.acf.ubersetzt === true && <>
                                                    <Tabs defaultActiveKey="deutsch" id="translated" className="mb-3">
                                                        <Tab className="w-100" eventKey="deutsch" title="Deutsch">
                                                            <Col sm={8} xs={12} dangerouslySetInnerHTML={ {__html: i.content.rendered} } />
                                                        </Tab>
                                                        {translatedPost.length > 0 && <Tab className="greek" eventKey="griechisch" title="ελληνικά ">
                                                            <Col className="w-100" sm={8} xs={12} dangerouslySetInnerHTML={ {__html: translatedPost[0].content.rendered} } />
                                                        </Tab>}
                                                    </Tabs>
                                                </>

                                                }

                                                {post[0].acf.ubersetzt === false && <Col sm={8} xs={12} dangerouslySetInnerHTML={ {__html: i.content.rendered} } />}
                                            </Row>
                                        </Container>
                                    </div>
                                    : '' }

                            </div>
                            {fetching
                                ? <Loading text='Loading'/>
                                :
                                <Footer/>
                            }
                        </div>
                    </div>
                        )
            }) : <Error/>

            }
        </div>
    );
};
