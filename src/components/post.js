import React, {useEffect, useState, useLayoutEffect} from "react";
import axios from "axios";
import jQuery from "jquery";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Col, Container, Image, Row} from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {scrolltop} from "./scrollTop";
import {capitalize} from "./capitalize";
import {animationOnScroll} from "./animationOnScroll";
import {replaceUmlaute} from "./replaceUmlaute";
import  Footer from "./footer"
import {Loading} from "./loading";
import Error from "./error";
export default function Post() {
    const [post, setPost] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [images, setImages] = useState([]);
    const [ photoIndex, setPhotoIndex] = useState(0);
    const [ open, setOpen ] = useState(false);
    const { category, name } = useParams();
    const navigate = useNavigate()
    const openGallery = () => {
        setOpen(true);
    }
    const closeGallery = () => {
        setOpen(false)
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const getResult = async () => {
        const post = await axios.get('http://test.chakito.com/m/index.php/wp-json/wp/v2/posts?search='+ name);
        setPost(post.data.filter(
            function(element){
                return replaceUmlaute(element.x_categories).toLowerCase() == category.toLowerCase() && replaceUmlaute(element.title.rendered).toLowerCase() == name.toLowerCase();
            }));
        setFetching(false);
    };
    useEffect(  () => {
        if(jQuery('.blocks-gallery-grid').length > 0) {
            jQuery('.blocks-gallery-grid li img').each(function () {
                setImages(images => [...images, jQuery(this).attr('data-full-url')]);
            });
            jQuery('.blocks-gallery-grid').remove();
        }
        if(jQuery('.wp-block-gallery').length > 0) {
            jQuery('.wp-block-gallery .wp-block-image img').each(function () {
                setImages(images => [...images, jQuery(this).attr('src')]);
            });
            jQuery('.wp-block-gallery').remove();
        }
        jQuery(document).ready(function() {
            jQuery(".SRLContainer").on("contextmenu", function () {
                return false;
            });
            jQuery(".SRLContainer").on("contextmenu", function () {
                return false;
            });
        });
        animationOnScroll();
    });
    useEffect(  () => {
        getResult();
        scrolltop();

    }, [setPost]);
    if(post.length > 0 && fetching === true){
        document.title=`Nadia // ${capitalize(post[0].title.rendered)}`;
    }
    useEffect(()=> {

        if(post.length === 0 && fetching === false) {
            document.title = "Nadia // 404";
        }
    }, [])

    return (
        <div>
            {(post.length > 0 && fetching === false) ? post.map((i, index) => {
                return (
                    <div key={index} className=' content-container'>
                        <div className='post footerBottom' key={index}>
                            {i.x_featured_media?
                                <><Container fluid="xl">
                                    <Row className="post--header justify-content-md-around">
                                        <Col lg={3} md={3} sm={4} xs={8} className={`animation animation--zoom--out post--header--thumbnail mx-4 ${images.length > 0 ? "pointer" : ""}`}>
                                            <Image onClick={openGallery} src={i.x_featured_media} fluid/>
                                        </Col>
                                        <Col lg="auto" sm={4} xs={8} className="post--header--text mt-2 mx-4">
                                            <div className="animation animation--top post--header--breadcrumbs">
                                                <Link to="/"><h3 className="m-0">Start</h3></Link> /
                                                {category && <h3 onClick={()=> navigate(`/${i.x_tags}/${category}`)} className="link m-0 align-self-center">{i.x_categories}</h3>}
                                            </div>
                                            <h1 className="animation animation--bottom m-0">{i.title.rendered}</h1>
                                        </Col>
                                        <Col xl={12}>

                                        </Col>
                                    </Row>
                                </Container>
                                    {fetching
                                        ? <Loading text='Loading'/>
                                        :
                                        <Footer/>
                                    }
                                </>
                                : '' }
                            {i.content.rendered?
                                <div className="animation post--body">
                                    <Container fluid="xl">
                                        <Row className='justify-content-center'>
                                            <Col sm={8} xs={12}>
                                                <div className='content' dangerouslySetInnerHTML={ {__html: i.content.rendered} } />
                                                <div className='board'>
                                                    <Row>
                                                        {open && (
                                                            <Lightbox
                                                                enableZoom ={false}
                                                                reactModalProps={customStyles}
                                                                mainSrc={images[photoIndex]}
                                                                nextSrc={images[(photoIndex + 1) % images.length]}
                                                                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                                                onCloseRequest={() => closeGallery()}
                                                                onMovePrevRequest={() => {
                                                                    setPhotoIndex((photoIndex + images.length - 1) % images.length)
                                                                    console.log(images[(photoIndex + images.length - 1) % images.length])
                                                                }

                                                                }
                                                                onMoveNextRequest={() =>
                                                                    setPhotoIndex((photoIndex + 1) % images.length)
                                                                }
                                                            />
                                                        )}
                                                    </Row>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                : '' }
                        </div>
                    </div>
                )
            }) :
            <Error/>
            }
        </div>
    )
};
