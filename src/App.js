import React, {useContext} from "react";
import loadable from '@loadable/component';
import {Routes, Route} from "react-router";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {ToastContainer} from "react-toastify";

// to create subscription client
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {setContext} from "@apollo/client/link/context";

import './App.css';
import '../src/css/main.css';

import logo from './logo.svg';

import {AuthContext} from "./context/authContext";
import NavHeader from "./components/NavHeader";

const Home = loadable(() => import("./pages/Home"));
const Users = loadable(() => import("./pages/Users"));
const SingleUser = loadable(() => import("./pages/SingleUser"));
const Register = loadable(() => import("./pages/auth/Register"));
const Login = loadable(() => import("./pages/auth/Login"));
const CompleteRegistration = loadable(() => import("./pages/auth/CompleteRegistration"));
const PasswordForgot = loadable(() => import("./pages/auth/PasswordForgot"));
const PasswordUpdate = loadable(() => import("./pages/auth/PasswordUpdate"));
const Profile = loadable(() => import("./pages/auth/Profile"));
const Post = loadable(() => import("./pages/post/Post"));
const PostUpdate = loadable(() => import("./pages/post/PostUpdate"));
const SinglePost = loadable(() => import("./pages/post/SinglePost"));
const PostArchives = loadable(() => import("./pages/post/PostArchives"));
const PublicRoute = loadable(() => import("./components/PublicRoute"));
const PrivateRoute = loadable(() => import("./components/PrivateRoute"));
const SearchResult = loadable(() => import("./components/SearchResult"));

const Webhook = loadable(() => import("./pages/Webhook"));
const Selection = loadable(() => import("./pages/trading/Selection"));
const Timing = loadable(() => import("./pages/trading/Timing"));
const LiveStream = loadable(() => import("./pages/trading/LiveStream"));
const Selling = loadable(() => import("./pages/trading/Selling"));
const MarketHealth = loadable(() => import("./pages/trading/MarketHealth"));
const Mindset = loadable(() => import("./pages/trading/Mindset"));
const PositionSizing = loadable(() => import("./pages/trading/PositionSizing"));
const PositionManagement = loadable(() => import("./pages/trading/PositionManagement"));


const App = () => {

    const {state} = useContext(AuthContext);
    const {user} = state;
    // this authtoken bullshit is written between for a normal login with email and password, token in object structure
    // user.token.token whereas for google login is user.token. So to accommodate both logins...
    const authtoken = user ? (user.token ? (user.token.token ? user.token.token : user.token) : "") : "";

    // 1. create websocket link
    const wsLink = new GraphQLWsLink(createClient({
        url: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
        options: {
            reconnect: true
        }
    }));

    // 2. create http link
    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
    });

    // 3. setContext for authtoken
    const authLink = setContext(() => {
        return {
            headers: {
                authtoken: authtoken
            }
        }
    });

    // 4. concat http and authtoken link
    const httpAuthLink = authLink.concat(httpLink);

    // 5. use split to split between http link and websocket link
    // The split function takes three parameters:
    // * A function that's called for each operation to execute
    // * The Link to use for an operation if the function returns a "truthy" value
    // * The Link to use for an operation if the function returns a "falsy" value
    const splitLink = split(
        ({query}) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpAuthLink,
    );

    const client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <NavHeader/>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/register" element={
                    <PublicRoute>
                        <Register/>
                    </PublicRoute>
                }/>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                }/>
                <Route path="/complete-registration" element={<CompleteRegistration/>}/>
                <Route path="/password/forgot" element={<PasswordForgot/>}/>
                <Route path="/password/update" element={
                    <PrivateRoute>
                        <PasswordUpdate/>
                    </PrivateRoute>
                }/>
                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>
                }/>
                <Route path="/post/create" element={
                    <PrivateRoute>
                        <Post/>
                    </PrivateRoute>
                }/>
                <Route path="/post/update/:postid" element={
                    <PrivateRoute>
                        <PostUpdate/>
                    </PrivateRoute>
                }/>
                <Route path="/post/:postid" element={<SinglePost/>}/>
                <Route path="/search/:searchterm" element={<SearchResult/>}/>
                <Route path="/users/:username" element={<SingleUser/>}/>
                <Route path="/trading/selection" element={<Selection/>}/>
                <Route path="/trading/timing" element={<Timing/>}/>
                <Route path="/trading/position-sizing" element={<PositionSizing/>}/>
                <Route path="/trading/position-management" element={<PositionManagement/>}/>
                <Route path="/trading/selling" element={<Selling/>}/>
                <Route path="/trading/market-health" element={<MarketHealth/>}/>
                <Route path="/trading/mindset" element={<Mindset/>}/>
                <Route path="/livestream" element={<LiveStream/>}/>
                <Route path="/livestream/history" element={
                    <PostArchives/>
                }/>
                <Route path="/webhook" element={<Webhook/>}/>
            </Routes>
        </ApolloProvider>
    );
}

export default App;
