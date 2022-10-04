import React, {useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_ALL_POSTS} from "../../graphql/queries";
import PostCard from "../../components/PostCard";

const PostArchives = () => {
    const [posts, setPosts] = useState();

    const [getAllPosts, {data, loading, error}] = useLazyQuery(GET_ALL_POSTS);

    useEffect(() => {
        getAllPosts().then(res => setPosts(res.data));
    }, [])

    return (
        <div className="postArchives">
            <h3 className="postArchives__header container">See the past live stream updates</h3>
            {loading ? <div className="container">Fetching all posts</div>
                :
                <div className="postArchives__posts container">
                    {data && data.allPosts.map(p => (
                        <PostCard key={p._id} post={p}/>
                    ))}
                </div>
            }
        </div>
    )
};

export default PostArchives;