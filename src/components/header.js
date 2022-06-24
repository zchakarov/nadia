import React, {useEffect, useLayoutEffect, useState} from "react";
import Axios from "axios";
import jQuery from "jquery";
import {Image, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown"
import {Col, Container, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {scrolltop} from "./scrollTop";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faInstagram} from '@fortawesome/free-brands-svg-icons'
import SearchBar from "./searchBar";
import Home from "./home";
import "./isInViewport";
import {Loading} from "./loading";
import {replaceUmlaute} from "./replaceUmlaute";
library.add(fas, faHome, faPhone);
library.add(fab, faInstagram);

export default function Header(products){
    const [ data , setData ] = useState([ ]);
    const [expanded, setExpanded] = useState(false);
    const [fetching, setFetching] = useState(true)

    useLayoutEffect(  () => {
        jQuery('.animation').each(function () {
            if (jQuery(this).isInViewport() && !(jQuery(this).hasClass('el_in_viewport'))) {
                jQuery(this).addClass('el_in_viewport');
            }
        }, []);
    });

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect( () => {
        Axios.get('http://test.chakito.com/m/index.php/wp-json/menus/v1/menus/menu_nadia').then(res => {
            setData(res.data);
            setFetching(false)
        });

        jQuery('.navbar-toggler').on('click', function () {
            jQuery('body').toggleClass('overflowhidden');
            jQuery('.navigation-link').on('click', function () {
                jQuery('body').removeClass('overflowhidden');
            });
        });

        var wWidth = jQuery(window).width();
        if(wWidth > 768){
            console.log(wWidth);
            jQuery(".dropdown-toggle").on("click", function(){
                console.log(jQuery(this).next(".dropdown-menu"));
                jQuery(this).next(".dropdown-menu").toggle(400);
            });
            jQuery(".dropdown-toggle").on("click", function(){
                console.log(jQuery(this).next(".dropdown-menu"));
                jQuery(this).next(".dropdown-menu").toggle(400);
            });
        }
        else{
            jQuery(".dropdown-toggle").click(function(){
                jQuery(this).next("ul").slideToggle(400);
            });
        }

    }, []);

    return (
        <Container className="header"  fluid>
            <Row className="animation animation--top header--bar">
                <Col xs="auto">
                    <div className="">
                        <FontAwesomeIcon icon="phone" size="1x"/>

                        <span className="phone mx-2">0511-45 12 93</span>
                        <FontAwesomeIcon icon="home" size="1x"/>

                        <span className="address mx-2">Voßstraße 25, 30161 Hannover</span>
                    </div>
                </Col>

            </Row>
            <Row className="animation animation--zoom--out header--logo justify-content-center">
                <Col xs="auto">
                    <Link to="/">
                        <img src="/logo.png" width="200" className="img-fluid" />

                    </Link>
                </Col>
            </Row>
            <Row className="header--navigation justify-content-center">
                <Col xs="12">
                    {fetching === true ?
                        <Loading text='Loading'/> :
                        <Navbar className="" expanded={expanded} expand="lg" sticky="bottom">
                            <Navbar.Toggle className="" onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" >
                                <span className="line"/>
                                <span className="line"/>
                            </Navbar.Toggle>
                            <Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
                                <Nav className="w-100 justify-content-center  align-items-center">
                                    {data.items
                                        ?data.items.map((item, i) => (
                                            <Nav.Item className="" key={i}>

                                                {item.child_items && item.child_items.length > 0 ?
                                                    <NavDropdown className='navigation-link ' id="dropdown" title={item.title} renderMenuOnMount={true}>
                                                        { item.child_items.map((child, ci) => (
                                                            <NavDropdown.Item as="li" key={ci}>
                                                                {   child.type_label !== "Individueller Link" ?
                                                                    <NavLink
                                                                              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                                                                              data-name={child.title}
                                                                             onClick={() => setExpanded(false)}
                                                                             to={{
                                                                                 pathname: `/${item.slug.toLowerCase()}/${replaceUmlaute(child.title.toLowerCase())}`
                                                                             }}
                                                                    >{child.title}
                                                                    </NavLink>:

                                                                    <Nav.Link active={false} className="nav-link" href={child.url} target="_blank" onClick = {()=>{openInNewTab(child.url); setExpanded(false)}}>{child.title}</Nav.Link>

                                                                }

                                                            </NavDropdown.Item>
                                                        ))}
                                                    </NavDropdown> :
                                                    <NavLink className='navigation-link nav-link p-0' data-name={item.title}
                                                             onClick={() => setExpanded(false)} to={{
                                                        pathname: `/${item.slug}`
                                                    }}
                                                    >{item.title}</NavLink>

                                                }

                                            </Nav.Item>
                                        ))
                                        : ''}


                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    }

                </Col>
            </Row>
        </Container>

    )
}


/*
<Col xs={12} sm="auto">
                    <div className="d-flex align-items-center justify-content-end">

                        <a href="https://www.instagram.com/hochzeit_taufaccessoires/" target="_blank"><FontAwesomeIcon icon={['fab', 'instagram']} className=" fa-lg"/></a>
                    </div>
                </Col>
 */
