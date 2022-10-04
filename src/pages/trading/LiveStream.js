import React, {useState, useContext, useEffect, Fragment} from "react";
import {Player} from '@lottiefiles/react-lottie-player';
import {useLazyQuery, useQuery, useSubscription} from "@apollo/client";
import {GET_ALL_POSTS, GET_ALL_POSTS_THIS_WEEK, NUMBER_OF_POSTS} from "../../graphql/queries";
import {POST_ADDED, POST_DELETED, POST_UPDATED} from "../../graphql/subscriptions";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import PostCard from "../../components/PostCard";
// this stringifyForDisplay solves the re-rendering part of Tradingview widget
// instead of going to default theme
import {stringifyForDisplay} from "@apollo/client/utilities";

const LiveStream = () => {
    // const [page, setPage] = useState(1);
    const [showTwitterTimeline, setShowTwitterTimeline] = useState(true);
    const {data, loading, error} = useQuery(GET_ALL_POSTS_THIS_WEEK, {
        variables: {week: 1}
    });
    // const {data: postCount} = useQuery(NUMBER_OF_POSTS);
    const [fetchPosts, {data: posts}] = useLazyQuery(GET_ALL_POSTS_THIS_WEEK);

    // subscription > post added
    const {data: newPost} = useSubscription(POST_ADDED, {
        onSubscriptionData: async ({client: {cache}, subscriptionData: {data}}) => {
            // readQuery from cache
            const {allPostsThisWeek} = cache.readQuery({
                query: GET_ALL_POSTS_THIS_WEEK,
                // variables: {page}
            });

            // write back to cache
            cache.writeQuery({
                query: GET_ALL_POSTS_THIS_WEEK,
                // variables: {page},
                data: {
                    allPostsThisWeek: [data.postAdded, ...allPostsThisWeek]
                }
            });

            // refetch all posts to update UI
            await fetchPosts({
                // variables: {page},
                refetchQueries: [{
                    query: GET_ALL_POSTS_THIS_WEEK,
                    // variables: {page}
                }]
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
    //     onSubscriptionData: async ({client: {cache}, subscriptionData: {data}}) => {
    //         // readQuery from cache
    //         const {allPostsThisWeek} = cache.readQuery({
    //             query: GET_ALL_POSTS_THIS_WEEK,
    //             // variables: {page}
    //         });
    //
    //         // let updatedPosts = allPostsThisWeek.map(x => (x._id === data.postUpdated._id) ? data.postUpdated : x);
    //         // console.log("the updatedPosts are ----jaffa", updatedPosts);
    //         let filteredPosts = allPostsThisWeek.filter((p) => p._id !== data.postUpdated._id);
    //         console.log("the updatedPost is ----jaffa", data.postUpdated);
    //         console.log("the filtered posts are ----jaffa", filteredPosts);
    //         let newPosts = [data.postUpdated, ...filteredPosts];
    //         console.log("the new all posts are ----jaffa", allPostsThisWeek);
    //         // write back to cache
    //         cache.writeQuery({
    //             query: GET_ALL_POSTS_THIS_WEEK,
    //             // variables: {page},
    //             data: {
    //                 allPostsThisWeek: newPosts
    //             }
    //         });
    //
    //         // refetch all posts to update UI
    //         await fetchPosts({
    //             // variables: {page},
    //             refetchQueries: [{
    //                 query: GET_ALL_POSTS_THIS_WEEK,
    //                 // variables: {page}
    //             }]
    //         });
    //         console.log("fetching all posts again after updating --jaffa");
    //
    //         toast.success('Post Updated!');
    //     }
    // });

    // subscription > post deleted
    const {data: postDeleted} = useSubscription(POST_DELETED, {
        onSubscriptionData: async ({client: {cache}, subscriptionData: {data}}) => {
            // readQuery from cache
            const {allPostsThisWeek} = cache.readQuery({
                query: GET_ALL_POSTS_THIS_WEEK,
                // variables: {page}
            });
            let filteredPosts = allPostsThisWeek.filter((p) => p._id !== data.postDeleted._id);
            // write back to cache
            cache.writeQuery({
                query: GET_ALL_POSTS_THIS_WEEK,
                // variables: {page},
                data: {
                    allPostsThisWeek: filteredPosts
                }
            });

            // refetch all posts to update UI
            fetchPosts({
                // variables: {page},
                refetchQueries: [{
                    query: GET_ALL_POSTS_THIS_WEEK,
                    // variables: {page}
                }]
            });

            toast.error('Post deleted!');
        }
    });

    // access context
    const {state, dispatch} = useContext(AuthContext);

    let item;
    const checkDarkThemeData = () => {
        item = localStorage.getItem("theme");
    };

    const checkTwitterToggle = () => {
        let toggle = localStorage.getItem("showTwitterTimeline");
        if (toggle === 'true') {
            setShowTwitterTimeline("true");
        } else {
            setShowTwitterTimeline("false");
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
        // import('../../componentScripts/twitterTimeline');
        // const twitterScript = document.createElement('script');
        // twitterScript.type = "text/javascript";
        // twitterScript.src = "https://platform.twitter.com/widgets.js";
        // twitterScript.async = true;
        // document.body.appendChild(twitterScript);

        checkDarkThemeData();
        checkTwitterToggle();

        td(item);

        const mutationCallback = (mutationsList) => {
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

            try {
                // document.body.removeChild(twitterScript);
                observer.disconnect();
                document.getElementById("tradingView").remove();
            } catch (e) {
                console.log("the clean up error is ---jaffa", e);
            }
        }
    }, [item]);

    // react router
    const navigate = useNavigate();

    // const pagination = () => {
    //     const totalPages = Math.ceil(postCount && postCount.numberOfPosts / 20);
    //     let pages = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         pages.push(
    //             <li key={i}>
    //                 <h1 className={`page-link active`} onClick={() => setPage(i)}>{i}</h1>
    //             </li>
    //         );
    //     }
    //     return pages;
    // }

    const livePosts = loading ? <p className="p-5">Loading.......</p> :
        <Fragment>
            <div className="livestream__posts__watchlist">
                {data && data.allPostsThisWeek.filter(p => p.category === 'watchlist').map(p => (
                    <PostCard key={p._id} post={p}/>
                ))}
            </div>
            <div className="livestream__posts__commentary">
                {data && data.allPostsThisWeek.filter(p => p.category !== 'watchlist').map(p => (
                    <PostCard key={p._id} post={p}/>
                ))}
            </div>
            {/*<nav>*/}
            {/*    <ul className="pagination justify-content-center">{pagination()}</ul>*/}
            {/*</nav>*/}
        </Fragment>

    const toggleTwitterTimeline = (e) => {
        e.preventDefault();
        let isToggle = e.target.getAttribute("aria-expanded") === "false" ? "true" : "false";
        e.target.setAttribute("aria-expanded", isToggle);
        localStorage.setItem("showTwitterTimeline", isToggle);
    }

    const watchlist = "The watchlist for this week is $SWAV, $VRTX, $CELH, $VERU";

    return (
        <div className="livestream" id="livestream">
            <div className="livestream__posts container">
                {/*<div className="livestream__posts__watchList">*/}
                {/*    <h4>Watchlist for this week</h4>*/}
                {/*    <p>SWAV, VRTX, CELH, STKL, VERU</p>*/}
                {/*    <a className="twitter-share-button"*/}
                {/*        // href="https://twitter.com/share?ref_src=twsrc%5Etfw/tweet?text=Hello%20world"*/}
                {/*       href={`https://twitter.com/intent/tweet?text=${watchlist}`}*/}
                {/*       data-show-count="true" data-size="large" dnt="true" rel="noopener noreferrer">Tweet</a>*/}
                {/*</div>*/}
                {/*<div className="livestream__posts__commentary">*/}
                {/*<h5>Updates</h5>*/}
                {livePosts}
                {/*</div>*/}
            </div>
            <div
                className="livestream__twitter__toggle buttonJ buttonJ__tertiary buttonJ__rounded"
                id="twitter-toggle"
                aria-controls="twitter-livestream"
                aria-expanded={showTwitterTimeline}
                role="button"
                data-mdb-toggle="tooltip"
                onClick={(e) => toggleTwitterTimeline(e)}
                title="Click to toggle the display of tweets">
                <span className="livestream__twitter__toggle__icon"><i className="fab fa-twitter"></i><span
                    className="livestream__twitter__toggle__text">Tweets</span><i className="fas fa-times"></i></span>
            </div>
            <div className="livestream__twitter__content" id="twitter-livestream" aria-labelledby="twitter-toggle">
                <div className="livestream__twitter__content__timeline">
                    <a className="twitter-timeline"
                       href="https://twitter.com/venkatesh_koka/lists/super-important-traders-74657?ref_src=twsrc%5Etfw"
                       data-aria-polite="assertive">
                        A Twitter List by venkatesh_koka</a>
                </div>
            </div>

        </div>
    );
}

export default LiveStream;
