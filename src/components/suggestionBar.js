import React, { useState } from "react";
import "../scss/suggestionBar.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function SuggestionBar( props ) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [expanded, setExpanded] = useState(false)
    const handleFilter = (event) => {
        console.log(props)
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = props.data.filter((value) => {
            return value.title.rendered.toLowerCase().includes(searchWord.toLowerCase()) || value.x_categories.toLowerCase().includes(searchWord.toLowerCase());
        });
        setExpanded(true);

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };
    let body = document.querySelector('body');

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        setExpanded(false);
    };

    const expandeSearchbar = () => {
        setExpanded(true);
    }

    const setSuggestion = (param) => {
        setWordEntered(param);
        setFilteredData([]);
        props.onProductChange(param);
    }

    return (
        <div className="suggestion">
            <div className="suggestionInputs">
                <input
                    type="text"
                    value={wordEntered}
                    onChange={handleFilter}
                />
            </div>

            <div className={`dataResult ${filteredData.length !== 0 ? "show" : ""}`}>
                <ul className="p-0 m-0">
                    {filteredData.map((value, key) => {
                        return (
                            <li key={value.id} className="dataItem" onClick={() => setSuggestion(value.title.rendered)}>
                                <p className="m-0">{value.title.rendered} / <small>{value.x_categories}</small> </p>
                            </li>
                        );
                    })}

                </ul>
            </div>
            <div className="suggestionIcon">
                <FontAwesomeIcon icon="search" size="1x" className={`search_svg ${expanded === true ? "" : "show"}`} />
                <FontAwesomeIcon icon="times-circle" size="1x" className={`close_svg ${expanded === true ? "show" : ""}`} id="clearBtn" onClick={clearInput}/>

            </div>
        </div>

    );
}

export default SuggestionBar;
