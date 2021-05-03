/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateInputItem } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createItem
// ====================================================

export interface createItem_createItem {
  __typename: "Item";
  id: string;
  title: string;
  description: string;
}

export interface createItem {
  createItem: createItem_createItem | null;
}

export interface createItemVariables {
  input: CreateInputItem;
}
