import React, { useState } from "react";
import "../scss/searchBar.scss";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTimesCircle, fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas, faSearch, faTimesCircle);
function SearchBar( props ) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [expanded, setExpanded] = useState(false)
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = props.data.products.filter((value) => {
            return value.title.rendered.toLowerCase().includes(searchWord.toLowerCase()) || value.x_categories.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        console.log(props)
    };
    let body = document.querySelector('body');
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        setExpanded(false);
        body.classList.remove('hidden');

    };

    const expandeSearchbar = () => {
        setExpanded(true);

        body.classList.add('hidden');
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <div className="test">
                    <input
                        className={`${expanded === true ? "expanded" : ""}`}
                        type="text"
                        placeholder={props.placeholder}
                        value={wordEntered}
                        onChange={handleFilter}
                    />

                        <div
                            className={`dataResult ${filteredData.length !== 0 ? "show" : ""}`}>
                                {filteredData.slice(0, 15).map((value, key) => {
                                    return (
                                        <div
                                            key={value.id}
                                        >
                                            <Link to={`/${value.x_tags}/${value.x_categories}/${value.slug}`} className="dataItem" onClick={clearInput}>
                                                <p className="m-0">{value.title.rendered} / <small>{value.x_categories}</small> </p>
                                            </Link>
                                        </div>
                                    );
                                })}

                        </div>

                </div>

                <div className="searchIcon">
                    <FontAwesomeIcon icon="search" size="1x" className={`search_svg ${expanded === true ? "" : "show"}`} onClick={expandeSearchbar}/>
                    <FontAwesomeIcon icon="times-circle" size="1x" className={`close_svg ${expanded === true ? "show" : ""}`} id="clearBtn" onClick={clearInput}/>

                </div>
            </div>


        </div>

    );
}

export default SearchBar;
