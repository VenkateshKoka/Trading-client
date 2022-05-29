import {gql} from "apollo-boost";

export const USER_INFO = gql`
    fragment userInfo on User {
        _id,
        name,
        username,
        email,
        images {
            url,
            public_id,
            __typename @skip(if:true)
        }
        about,
        createdAt,
        updatedAt
    }
`;

export const POST_INFO = gql`
    fragment postInfo on Post {
        _id,
        content,
        images {
            url,
            public_id
            __typename @skip(if:true)
        },
        postedBy {
            _id,
            username
        }
    }
`;