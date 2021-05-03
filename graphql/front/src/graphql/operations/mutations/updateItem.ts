import { gql } from "@apollo/client";

export const UPDATE_ITEM = gql`
  mutation updateItem($id: ID!, $input: CreateInputItem!) {
    updateItem(id: $id, input: $input) {
      id
      title
      description
    }
  }
`;
