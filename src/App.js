import React, {useContext, useState} from "react";
import {Routes, Route} from "react-router";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";

import './App.css';
import '../src/css/main.css';

import logo from './logo.svg';

import NavHeader from "./components/NavHeader";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import {AuthContext} from "./context/authContext";
import PasswordForgot from "./pages/auth/PasswordForgot";
import PasswordUpdate from "./pages/auth/PasswordUpdate";
import Profile from "./pages/auth/Profile";
import Post from "./pages/post/Post";
import PostUpdate from "./pages/post/PostUpdate";
import SinglePost from "./pages/post/SinglePost";
import PublicRoute from "./components/PublicRoute";
import SingleUser from "./pages/SingleUser";
import SearchResult from "./components/SearchResult";

// to create subscription client
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {setContext} from "@apollo/client/link/context";
import Webhook from "./pages/Webhook";
import Selection from "./pages/trading/Selection";
import Timing from "./pages/trading/Timing";
import LiveStream from "./pages/trading/LiveStream";
import Selling from "./pages/trading/Selling";
import MarketHealth from "./pages/trading/MarketHealth";
import Mindset from "./pages/trading/Mindset";
import PositionSizing from "./pages/trading/PositionSizing";
import PositionManagement from "./pages/trading/PositionManagement";
import PostArchives from "./pages/post/PostArchives";


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
