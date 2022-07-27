import React, {useState, useContext, useEffect} from "react";
import {useQuery, useLazyQuery, useSubscription} from "@apollo/client";
import {AuthContext} from "../context/authContext";
import {useNavigate} from "react-router-dom";
import {GET_ALL_POSTS, NUMBER_OF_POSTS} from "../graphql/queries";
import {POST_ADDED, POST_UPDATED, POST_DELETED} from "../graphql/subscriptions";
import PostCard from "../components/PostCard";
import {toast} from "react-toastify";
import {Player} from '@lottiefiles/react-lottie-player';

const Home = () => {
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
            fetchPosts({
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

    useEffect(() => {
        const tradingViewWidget = document.createElement("div");
        tradingViewWidget.setAttribute("id", "tradingView");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.text = `
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
                "colorTheme": "light",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "in"
            `;
        tradingViewWidget.appendChild(script);
        document.getElementById("root").appendChild(tradingViewWidget);

        return () => {
            // clean up the script when the component in unmounted
            document.getElementById("tradingView").remove();
        }
    }, []);

    // react router
    const navigate = useNavigate();

    const pagination = () => {
        const totalPages = Math.ceil(postCount && postCount.numberOfPosts / 3);
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li>
                    <h1 className={`page-link active`} onClick={() => setPage(i)}>{i}</h1>
                </li>
            );
        }
        return pages;
    }

    const livePosts = loading ? <p className="p-5">Loading.......</p> :
        <React.Fragment>
            <div className="home__liveStream">
                <div className="container">
                    <div className="row p-5">
                        {data && data.allPosts.map(p => (
                            <div className="col-md-4" key={p._id}>
                                <PostCard post={p}/>
                            </div>
                        ))}
                    </div>
                    <div className="container">
                        <div className="row p-5">
                            {posts && <h4>The lazy query posts are </h4>}
                            {posts && posts.allPosts.map(p => (
                                <div key={p._id}>
                                    {p.content}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <nav>
                    <ul className="pagination justify-content-center">{pagination()}</ul>
                </nav>
                <hr/>
                <hr/>
                <btn className="mx-2" color="info" onClick={() => fetchPosts()}>
                    Get All Posts
                </btn>
            </div>
        </React.Fragment>;

    return (
        <div className="home" id="home">
            <div className="home__hero container">
                <div className="home__hero__animation">
                    <Player src="https://assets8.lottiefiles.com/packages/lf20_xwrbzebb.json"
                            background="transparent"
                            speed="0.5"
                            style={{width: "100%", height: "100%", opacity: "0.9"}}
                            loop
                            autoplay>
                    </Player>
                </div>
                <div className="home__hero__content">
                    <h1>Best way to improve on your trading journey</h1>
                </div>
            </div>
            <div className="home__tradingSteps container">
                <div className="home__tradingSteps__title">
                    Stock Trading Mastery
                </div>
                <div className="home__tradingSteps__content">
                    <div className="home__tradingSteps__content__step" onClick={() => navigate(`/trading/selection`)}>
                        <h3 className="title">Step 1</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">what to buy</span>
                    </div>
                    <div className="home__tradingSteps__content__step" onClick={() => navigate(`/trading/timing`)}>
                        <h3 className="title">Step 2</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <a href="#">Read More</a>
                        <span className="circle"></span>
                        <span className="topic">when to buy</span>
                    </div>
                    <div className="home__tradingSteps__content__step">
                        <h3 className="title">Step 3</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <a href="#">Read More</a>
                        <span className="circle"></span>
                        <span className="topic">how much to buy</span>
                    </div>
                    <div className="home__tradingSteps__content__step">
                        <h3 className="title">Step 4</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <a href="#">Read More</a>
                        <span className="circle"></span>
                        <span className="topic">managing the position(after buying)</span>
                    </div>
                    <div className="home__tradingSteps__content__step">
                        <h3 className="title">Step 4</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <a href="#">Read More</a>
                        <span className="circle"></span>
                        <span className="topic">when to sell / close</span>
                    </div>
                    <div className="home__tradingSteps__content__step"
                         onClick={() => navigate(`/trading/markethealth`)}>
                        <h3 className="title">Step 5</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">General market Health</span>
                    </div>


                    <div className="home__tradingSteps__content__step"
                         onClick={() => navigate(`/trading/markethealth`)}>
                        <h3 className="title">Step 5</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">General market Health</span>
                    </div>
                    <div className="home__tradingSteps__content__step"
                         onClick={() => navigate(`/trading/markethealth`)}>
                        <h3 className="title">Step 5</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">General market Health</span>
                    </div>
                    <div className="home__tradingSteps__content__step"
                         onClick={() => navigate(`/trading/markethealth`)}>
                        <h3 className="title">Step 5</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">General market Health</span>
                    </div>
                    <div className="home__tradingSteps__content__step"
                         onClick={() => navigate(`/trading/markethealth`)}>
                        <h3 className="title">Step 5</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">General market Health</span>
                    </div>
                    <div className="home__tradingSteps__content__step"
                         onClick={() => navigate(`/trading/markethealth`)}>
                        <h3 className="title">Step 5</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">General market Health</span>
                    </div>
                    <div className="home__tradingSteps__content__step"
                         onClick={() => navigate(`/trading/markethealth`)}>
                        <h3 className="title">Step 5</h3>
                        <p>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer
                            software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                        <a href="#">Read More >></a>
                        <span className="circle"></span>
                        <span className="topic">General market Health</span>
                    </div>
                </div>
            </div>
            {livePosts}
        </div>
    );
}

export default Home;
