import {gql} from "@apollo/client";
import {POST_INFO} from "./fragments";

export const POST_ADDED = gql`
    subscription {
        postAdded {
            ...postInfo
        }
    }
    ${POST_INFO}
`;

export const POST_UPDATED = gql`
    subscription {
        postUpdated {
            ...postInfo
        }
    }
    ${POST_INFO}
`;

export const POST_DELETED = gql`
    subscription {
        postDeleted {
            ...postInfo
        }
    }
    ${POST_INFO}
`;