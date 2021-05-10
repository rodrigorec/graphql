import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
    mutation createItem($input: CreateInputItem!) {
        createItem(input: $input) {
            id
            title
            description
        }
    }
`;
