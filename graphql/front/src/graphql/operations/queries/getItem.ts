import { gql } from '@apollo/client';

export const GET_ITEM = gql`
    query GetItem($id: ID!) {
        item(id: $id) {
            id
            title
            description
        }
    }
`;
