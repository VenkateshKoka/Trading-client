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
        <form className="d-flex w-auto" role="search" onSubmit={handleSubmit}>
            <input
                type="search"
                className="form-control me-2 rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success rounded" type="submit">
                Search
            </button>
        </form>
    )
};

export default Search;