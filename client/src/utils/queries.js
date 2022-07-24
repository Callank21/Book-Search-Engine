import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            password
            savedBooks {
                authors
                description
                bookId
                title
                image
                link
            }
        }
    }
`;