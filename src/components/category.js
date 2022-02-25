import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useParams, useNavigate, Navigate} from "react-router-dom";
import {Loading} from "./loading";
import {scrolltop} from "./scrollTop";
import {animationOnScroll} from "./animationOnScroll";
import Tags from "./tags";
import Products from "./Products";
import {capitalize} from "./capitalize";


export default function Category() {
    const [portfolio, setPortfolio] = useState([]);
    const [fetching, setFetching] = useState(true);
    const { kategorie, category } = useParams();
    const navigate = useNavigate();
    const [parent, setParent] = useState([]);
    const [tag, setTag] = useState([]);

    useEffect(  () => {
        animationOnScroll();
        getCurentTag();
    }, []);
    useEffect( () => {
        getResults();

    }, [fetching]);

    useEffect(  () => {
        animationOnScroll()
    });

    const getCurentTag = async () => {
        const currentTag = await axios.get('http://test.chakito.com/m/index.php/wp-json/wp/v2/tags?search='+ kategorie);
        setTag(currentTag.data);
        setFetching(false);
        console.log(currentTag.data)
    }
    const getResults = async () => {
        console.log(tag);
        const portfolio = await axios('http://test.chakito.com/m/index.php/wp-json/wp/v2/posts?per_page=60&tags='+tag[0].id);
        setPortfolio(portfolio.data.filter(
            function(element){
                return element.x_categories.toLowerCase() == category.toLowerCase() && kategorie === element.x_tags;

            }
        ));

    }

    useEffect(  () => {
        scrolltop();
    }, []);

    useEffect( ()=> {
        document.title = capitalize(category);
        /*if(portfolio.length === 0 && fetching === false) {
            navigate("/404");
        }*/
    }, [])

    return (

        <div>
            <div>
                <div className='content-container'>
                    <Container fluid="xl">
                        {fetching
                            ? <Loading text='Loading'/>
                            : <Tags posts={portfolio} category={category} parent={kategorie} fetching={fetching}/>

                        }
                    </Container>

                </div>

            </div>

        </div>
    )
};
