import React from 'react';
import {Row, Col} from "react-bootstrap";

const Pagination = ({ postsPerPage, currentPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Row  className={`pagination ${pageNumbers.length !==1?"pagination--visible":"pagination--hidden"}`}>
            <Col lg={12} >

                <nav>
                    <ul>
                        { pageNumbers.map(number => (
                            <button onClick={() => paginate(number)} key={number} className={`button button--pagination ${currentPage === number ? "active" : ""}`}>
                                {number}
                            </button>
                        ))}
                    </ul>
                </nav>
            </Col>
        </Row>


    );
};

export default Pagination;
