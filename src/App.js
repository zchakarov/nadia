import React, {useEffect, useState} from 'react';
import Header from "./components/header";
import {BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { QueryClient, QueryClientProvider} from "react-query";
import './index.scss';
import Home from "./components/home";
import Category from "./components/category";
import Contact from "./components/Contact";
import Post from "./components/post";
import Error from "./components/error";
import Article from "./components/article";
import axios from "axios";
function App() {
    const location = useLocation();
    const queryClient = new QueryClient();
    const [ allProducts, setAllProducts] = useState([]);
    const [ fetching, setFetching] = useState(true)

    const getResults = async () => {
        const portfolio = await axios('http://test.chakito.com/m/index.php/wp-json/wp/v2/posts?per_page=150');
        setAllProducts(portfolio.data);
    }

    useEffect( () => {
        getResults();
    },[fetching]);

    return (
        <QueryClientProvider client={queryClient}>
            <div className='body-container'>
                <Header products={allProducts}/>

                <TransitionGroup className="transition-group">
                    <CSSTransition
                        key={location.key}
                        classNames="transition-element fade"
                        transitionAppear={false}
                        transitionEnter={true}
                        transitionLeave={true}
                        timeout={{
                            appear: 750,
                            enter: 750,
                            exit: 750,
                        }}
                        unmountOnExit={false}
                    >
                        <Routes location={location} className='container'>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/kontakt" element={<Contact children={allProducts}/>}/>
                            <Route path="/:name" element={<Article/>}/>
                            <Route path=":kategorie/:category" element={<Category/>}/>
                            <Route path=":kategorie/:category/:name" element={<Post/>}/>
                            <Route path="/404" element={<Error/>}/>
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </div>

        </QueryClientProvider>
    )
}


export default App;
