import React from "react";
import {useParams} from "react-router";
import {useQuery} from "@apollo/client";
import {SEARCH} from "../graphql/queries";
import PostCard from "./PostCard";

const SearchResult = () => {
    const {searchterm} = useParams();
    const {data, loading} = useQuery(SEARCH, {
        variables: {searchterm}
    });

    if (loading) return (
        <div className="container text-center">
            <p className="text-danger p-5">Loading...</p>
        </div>
    )

    if (!data || !data.search.length) {
        return (<div className="container text-center">
            <p className="text-danger p-5">
                No results found for <b>{searchterm}</b>
            </p>
        </div>);
    }

    return (
        <div className="container">
            <div className="row p-5">
                {(data && data.search) && data.search.map(p => {
                    return (<PostCard post={p} key={p._id}/>)
                })}
            </div>
        </div>
    )
};

export default SearchResult;