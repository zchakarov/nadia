import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useParams, useNavigate, Navigate} from "react-router-dom";
import {Loading} from "./loading";
import {scrolltop} from "./scrollTop";
import {animationOnScroll} from "./animationOnScroll";
import Tags from "./tags";
import Footer from "./footer";
import Products from "./Products";
import {capitalize} from "./capitalize";
import {replaceUmlaute} from "./replaceUmlaute";
import Error from "./error";


export default function Category() {
    const [portfolio, setPortfolio] = useState([]);
    const [fetching, setFetching] = useState(true);
    const { kategorie, category } = useParams();
    const [tag, setTag] = useState([]);
    const navigate = useNavigate();
    useEffect(  () => {
        animationOnScroll();
        getCurentTag();
    }, []);

    useEffect( () => {
        getResults();

    }, [tag]);

    useEffect(  () => {
        animationOnScroll()
    });

    const getCurentTag = async () => {
        const currentTag = await axios.get('http://test.chakito.com/m/index.php/wp-json/wp/v2/tags?search='+ kategorie);
        setTag(currentTag.data);
    }
    const getResults = async () => {
        if(tag[0].id.length !== 0) {
            const portfolio = await axios('http://test.chakito.com/m/index.php/wp-json/wp/v2/posts?per_page=60&tags='+tag[0].id);
            setPortfolio(portfolio.data.filter(
                function(element){
                    return replaceUmlaute(element.x_categories).toLowerCase() == category.toLowerCase() && kategorie === element.x_tags;
                }
            ));
            setFetching(false);
        }



    }
    if(portfolio.length > 0 && fetching === true    ) {
        document.title=`Nadia // ${capitalize(portfolio[0].x_categories)}`;
    }
    useEffect(  () => {
        scrolltop();
    }, []);

    useLayoutEffect( ()=> {

        if(portfolio.length === 0 && fetching === false) {
            document.title = "Nadia // 404";
        }

    }, [fetching])

    return (

                <div>
                    {(portfolio.length === 0 && fetching === false ) ?
                        <Error/> :
                    <div>
                        <div className='content-container'>
                            <Container fluid="xl">
                                {fetching
                                    ? <Loading text='Loading'/>
                                    : <Tags posts={portfolio} category={category} parent={kategorie} fetching={fetching}/>

                                }
                            </Container>

                        </div>
                        {fetching
                            ? <Loading text='Loading'/>
                            :
                            <Footer/>
                        }
                    </div>
                    }
                </div>


    )
};
