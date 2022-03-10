import React, {useEffect, useState} from "react";

import { Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import {scrolltop} from "./scrollTop";
import {replaceUmlaute} from "./replaceUmlaute";
import Products from "./Products";
import Footer from "./footer"
export default function Tags({ posts, category, parent, fetching}) {


    return (
        <>
            <Container fluid>
                <div
                    className="posts--grid justify-content-center justify-content-md-start  row">
                    {posts.map((post, index) => {
                        return (
                            <Col lg={3} md={4} sm={4} xs={8}
                                key={post.id} className="animation animation--bottom posts--grid--element">
                                <Link params={{ parent: parent }} key={index} to={`/${parent}/${category}/${replaceUmlaute(post.title.rendered.toLowerCase())}`}
                                      className="image-box">
                                    <div className="thumbnail">
                                        <img className="grayscale img-fluid"
                                             src={post.x_featured_media}
                                             alt={post.title.rendered}/>
                                    </div>

                                    <div className="headline my-3">
                                        <h4 className="m-0 text-center">{post.title.rendered}</h4>
                                    </div>
                                </Link>

                            </Col>
                        )


                    })}

                </div>

            </Container>
        </>
    )

}
