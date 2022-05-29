import {gql} from "apollo-boost";
import {POST_INFO, USER_INFO} from "./fragments";

export const USER_UPDATE = gql`
    mutation userUpdate($input: UserUpdateInput!) {
        userUpdate(input: $input) {
            ...userInfo
        }
    }
    ${USER_INFO}
`;

export const POST_CREATE = gql`
    mutation postCreate($input: PostCreateInput!) {
        postCreate(input: $input) {
            ...postInfo
        }
    }
    ${POST_INFO}
`;

export const POST_UPDATE = gql`
    mutation postUpdate($input: PostUpdateInput!) {
        postUpdate(input: $input) {
            ...postInfo
        }
    }
    ${POST_INFO}
`;

export const POST_DELETE = gql`
    mutation postDelete($postId: String!) {
        postDelete(postId: $postId) {
            _id
        }
    }
`;