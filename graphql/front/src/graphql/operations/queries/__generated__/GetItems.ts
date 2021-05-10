/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItems
// ====================================================

export interface GetItems_items {
    __typename: 'Item';
    id: string;
    title: string;
    description: string;
}

export interface GetItems {
    items: (GetItems_items | null)[] | null;
}
