/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateInputItem } from './../../../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: updateItem
// ====================================================

export interface updateItem_updateItem {
    __typename: 'Item';
    id: string;
    title: string;
    description: string;
}

export interface updateItem {
    updateItem: updateItem_updateItem | null;
}

export interface updateItemVariables {
    id: string;
    input: CreateInputItem;
}
