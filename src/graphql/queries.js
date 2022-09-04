import {gql} from "apollo-boost";
import {POST_INFO, USER_INFO} from "./fragments";

export const PROFILE_INFO = gql`
    query {
        profile {
            ...userInfo
        }
    }
    ${USER_INFO}
`;

export const GET_ALL_USERS = gql`
     query {
        allUsers {
            ...userInfo
        }
    }
    ${USER_INFO}
`;

export const NUMBER_OF_POSTS = gql`
     query {
        numberOfPosts
    }
`;

export const GET_ALL_POSTS = gql`
     query allPosts($page: Int, $week: Int) { 
        allPosts(page: $page, week: $week) {
            ...postInfo
        }
     }
     ${POST_INFO}
`;

export const GET_ALL_POSTS_THIS_WEEK = gql`
     query {
        allPostsThisWeek {
            ...postInfo
        }
    }
     ${POST_INFO}
`;

export const GET_ALL_POSTS_BY_USER = gql`
     query { 
        postsByUser {
            ...postInfo
        }
     }
     ${POST_INFO}
`;

export const SINGLE_POST = gql`
     query singlePost($postId: String!) { 
        singlePost(postId: $postId) {
            ...postInfo
        }
     }
     ${POST_INFO}
`;

export const SEARCH = gql`
     query search($searchterm: String!) { 
        search(searchterm: $searchterm) {
            ...postInfo
        }
     }
     ${POST_INFO}
`;

