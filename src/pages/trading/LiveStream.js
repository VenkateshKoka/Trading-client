import React, {useState, useContext, useEffect, Fragment} from "react";
import {Player} from '@lottiefiles/react-lottie-player';
import {useLazyQuery, useQuery, useSubscription} from "@apollo/client";
import {GET_ALL_POSTS, NUMBER_OF_POSTS} from "../../graphql/queries";
import {POST_ADDED, POST_DELETED, POST_UPDATED} from "../../graphql/subscriptions";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import PostCard from "../../components/PostCard";
import {stringifyForDisplay} from "@apollo/client/utilities";

const LiveStream = () => {
    const [page, setPage] = useState(1);
    const {data, loading, error} = useQuery(GET_ALL_POSTS, {
        variables: {page: page}
    });
    const {data: postCount} = useQuery(NUMBER_OF_POSTS);
    const [fetchPosts, {data: posts}] = useLazyQuery(GET_ALL_POSTS);

    // subscription > post added
    const {data: newPost} = useSubscription(POST_ADDED, {
        onSubscriptionData: async ({client: {cache}, subscriptionData: {data}}) => {
            // readQuery from cache
            const {allPosts} = cache.readQuery({
                query: GET_ALL_POSTS,
                variables: {page}
            });

            // write back to cache
            cache.writeQuery({
                query: GET_ALL_POSTS,
                variables: {page},
                data: {
                    allPosts: [data.postAdded, ...allPosts]
                }
            });

            // refetch all posts to update UI
            await fetchPosts({
                variables: {page},
                refetchQueries: [{query: GET_ALL_POSTS, variables: {page}}]
            });

            toast.success('New post!');
        }
    });

    // subscription > post updated
    // this works magic behind the scenes as it updates the post automatically based on post id. Even if not updating
    // the cache manually, but this works fine as long as the post in cache matches with updated post's id
    const {data: postUpdated} = useSubscription(POST_UPDATED, {
        onSubscriptionData: () => {
            toast.success(`Post Updated`)
        }
    });

    // subscription > post deleted
    const {data: postDeleted} = useSubscription(POST_DELETED, {
        onSubscriptionData: async ({client: {cache}, subscriptionData: {data}}) => {
            // readQuery from cache
            const {allPosts} = cache.readQuery({
                query: GET_ALL_POSTS,
                variables: {page}
            });
            let filteredPosts = allPosts.filter((p) => p._id !== data.postDeleted._id);
            // write back to cache
            cache.writeQuery({
                query: GET_ALL_POSTS,
                variables: {page},
                data: {
                    allPosts: filteredPosts
                }
            });

            // refetch all posts to update UI
            fetchPosts({
                variables: {page},
                refetchQueries: [{query: GET_ALL_POSTS, variables: {page}}]
            });

            toast.error('Post deleted!');
        }
    });

    // access context
    const {state, dispatch} = useContext(AuthContext);

    let item;
    const checkDarkThemeData = () => {
        item = localStorage.getItem("theme");

        if (item) {
            console.log(`the theme is ${item}-----jaffa`);
        }
    };

    const td = (item) => {
        if (document.getElementById("tradingView")) {
            document.getElementById("tradingView").remove();
        }
        const tradingViewWidget = document.createElement("div");
        tradingViewWidget.setAttribute("id", "tradingView");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.text =
            `{
                "symbols": [
                    {
                        "proName": "FOREXCOM:SPXUSD",
                        "title": "S&P 500"
                    },
                    {
                        "proName": "FOREXCOM:NSXUSD",
                        "title": "US 100"
                    },
                    {
                        "proName": "FX_IDC:EURUSD",
                        "title": "EUR/USD"
                    },
                    {
                        "proName": "BITSTAMP:BTCUSD",
                        "title": "Bitcoin"
                    },
                    {
                        "proName": "BITSTAMP:ETHUSD",
                        "title": "Ethereum"
                    }
                ],
                "showSymbolLogo": true,
                "colorTheme": ${stringifyForDisplay(item)},
                "isTransparent": true,
                "displayMode": "adaptive",
                "locale": "in"
            }`;
        tradingViewWidget.appendChild(script);
        document.getElementById("root").appendChild(tradingViewWidget);
    }

    useEffect(() => {
        checkDarkThemeData();
        td(item);

        const mutationCallback = (mutationsList) => {
            console.log("the mutations are ---jaffa", mutationsList);
            for (const mutation of mutationsList) {
                if (
                    mutation.type !== "attributes" ||
                    mutation.attributeName !== "data-theme"
                ) {
                    return
                }
                checkDarkThemeData();
                td(item);
                // console.log('old:jaffa', mutation.oldValue)
                // console.log('new:jaffa', mutation.target.getAttribute("data-theme"))
            }
        }

        const observer = new MutationObserver(mutationCallback);
        observer.observe(document.documentElement, {attributes: true})


        return () => {
            // clean up the script when the component in unmounted
            observer.disconnect();
            document.getElementById("tradingView").remove();
        }
    }, [item]);

    // react router
    const navigate = useNavigate();

    const pagination = () => {
        const totalPages = Math.ceil(postCount && postCount.numberOfPosts / 20);
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <h1 className={`page-link active`} onClick={() => setPage(i)}>{i}</h1>
                </li>
            );
        }
        return pages;
    }

    const livePosts = loading ? <p className="p-5">Loading.......</p> :
        <Fragment>
            {data && data.allPosts.map(p => (
                <PostCard key={p._id} post={p}/>
            ))}
            {/*<div className="container">*/}
            {/*    <div className="row p-5">*/}
            {/*        {posts && <h4>The lazy query posts are </h4>}*/}
            {/*        {posts && posts.allPosts.map(p => (*/}
            {/*            <div key={p._id}>*/}
            {/*                {p.content}*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <nav>
                <ul className="pagination justify-content-center">{pagination()}</ul>
            </nav>
            {/*<btn className="mx-2" color="info" onClick={() => fetchPosts()}>*/}
            {/*    Get All Posts*/}
            {/*</btn>*/};
        </Fragment>
    return (
        <div className="livestream container" id="livestream">
            <div className="livestream__watchList">
                <h2>This week's watchlist</h2>
                <p>SWAV, VRTX, CELH, STKL, VERU</p>
            </div>
            <div className="livestream__posts">
                <h5>Live updates</h5>
                {livePosts}
            </div>
        </div>
    );
}

export default LiveStream;
