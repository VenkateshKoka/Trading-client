import React, {useState} from "react";
import {useNavigate} from "react-router";

const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`);
    }

    return (
        <div className="container">
            <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-outline-success my-2 my-sm-0">
                    Search / {query}
                </button>
                {/*<span className="input-group-text border-0" id="search-addon">*/}
                {/*    <i className="fas fa-search"></i>*/}
                {/*</span>*/}
            </form>
        </div>
    )
};

export default Search;