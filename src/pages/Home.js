import React, {useState, useContext, useEffect} from "react";
import {useQuery, useLazyQuery, useSubscription} from "@apollo/client";
import {AuthContext} from "../context/authContext";
import {useNavigate} from "react-router-dom";
import {GET_ALL_POSTS, NUMBER_OF_POSTS} from "../graphql/queries";
import {POST_ADDED, POST_UPDATED, POST_DELETED} from "../graphql/subscriptions";
import PostCard from "../components/PostCard";
import {toast} from "react-toastify";
import {Player} from '@lottiefiles/react-lottie-player';
import Lottie from "lottie-react";

import ForwardTriangle from "../components/animations/ForwardTriangle";
import SpinningHexagon from "../components/animations/SpinningHexagon";
import BulbBlinking from "../components/animations/BulbBlinking";
import SandTimer from "../components/animations/SandTimer";

import mainAnimation from '../assets/homepage_main_lf20_xwrbzebb.json';
import marketHealthAnimation from '../assets/91145-health-insurance.json';
import mindsetAnimation from '../assets/98369-thinking-colors-adapted.json';

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
        // import('../componentScripts/forwardTriangleAnimation');
        const tradingViewWidget = document.createElement("div");
        tradingViewWidget.setAttribute("id", "tradingView");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.text = `
                {"symbols": [
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
                "colorTheme": "dark",
                "isTransparent": true,
                "displayMode": "adaptive",
                "locale": "in"
            }`;
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
                    <Lottie animationData={mainAnimation}
                            style={{width: "100%", height: "100%", opacity: "0.9"}}
                            background="transparent"
                            speed={1}
                            loop={true}
                            autoplay={true}
                    />
                </div>
                <div className="home__hero__content">
                    <h1>Unlock your trading potential. Make the lottie animation only when it's in page
                        focus. see if you can stop the animation after few seconds </h1>
                </div>
            </div>
            <div className="home__tradingSteps container">
                <div className="home__tradingSteps__step home__tradingSteps__selection"
                     onClick={() => navigate(`/trading/selection`)}>
                    <BulbBlinking/>
                    <h4>What to buy</h4>
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__timing"
                     onClick={() => navigate(`/trading/timing`)}>
                    <SandTimer/>
                    <h4>When to buy</h4>
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__positionManagement"
                     onClick={() => navigate(`/trading/positionManagement`)}>
                    <SpinningHexagon/>
                    {/*<ForwardTriangle/>*/}
                    <h4>How much to buy</h4>
                    {/*How many stocks to buy and how much of the portfolio percentage it should be. example of few 5%*/}
                    {/*positions stopping you out at once only results in tiny percentage off on the total portfolio.*/}
                    {/*How to add to positions(scaling in) if it goes right.*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__managing">
                    <ForwardTriangle/>
                    <h4>Manage position</h4>
                    {/*<h4>Manage position once bought.</h4>*/}
                    {/*what to do when the position goes wrong. Good place to introduce staggered stops. How to rotate your*/}
                    {/*portfolio money from the weaker performing stocks to the best. how to really concentrate your positions*/}
                    {/*when everything goes well. how to parlay your profits to make bigger bets.*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__selling">
                    <SpinningHexagon/>
                    <h4>
                        When to sell
                    </h4>
                    {/*Selling into strength and selling when stocks starts trending down. It's voluntary selling vs*/}
                    {/*involuntary selling.*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__markethealth"
                     onClick={() => navigate(`/trading/markethealth`)}>
                    {/*<Player src="https://assets10.lottiefiles.com/packages/lf20_xgdvjjxc.json" background="transparent"*/}
                    {/*        speed="1" style={{width: "80px", height: "80px"}} loop autoplay>*/}
                    {/*</Player>*/}
                    <Lottie animationData={marketHealthAnimation}
                            style={{width: "80px", height: "80px"}}
                            background="transparent"
                            speed={1}
                            loop={true}
                            autoplay={true}
                    />
                    <h4>Market health</h4>
                    {/*<h4>which depends on your own positions and some indicators like market*/}
                    {/*    breadth of advances and declines and percentage of stocks above their own 200d and 50 moving*/}
                    {/*    averages*/}
                    {/*</h4>*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__mindset"
                     onClick={() => navigate(`/trading/mindset`)}>
                    {/*<Player src="https://assets10.lottiefiles.com/packages/lf20_yfsmbm0r.json"*/}
                    {/*        background="transparent" speed="1"*/}
                    {/*        style={{marginTop: "-20px", width: "80px", height: "80px"}} loop*/}
                    {/*        autoplay>*/}
                    {/*</Player>*/}
                    <Lottie animationData={mindsetAnimation}
                            style={{marginTop: "-20px", width: "80px", height: "80px"}}
                            background="transparent"
                            speed={1}
                            loop={true}
                            autoplay={true}
                    />
                    <h4>Mindset</h4>
                </div>
            </div>
            {livePosts}
        </div>
    );
}

export default Home;
