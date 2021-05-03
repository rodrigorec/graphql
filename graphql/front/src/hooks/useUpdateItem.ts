import { useMutation } from "@apollo/client";
import { CreateInputItem } from "__generated__/globalTypes";
import {
  updateItem,
  updateItemVariables,
} from "src/graphql/operations/mutations/__generated__/updateItem";
import { UPDATE_ITEM } from "src/graphql/operations/mutations/updateItem";

export const UseUpdateItem = (id: string, inputValues: CreateInputItem) => {
  const { title, description } = inputValues;
  const [updateItem, { error, data, loading }] = useMutation<
    updateItem,
    updateItemVariables
  >(UPDATE_ITEM, {
    variables: {
      id,
      input: { title, description },
    },
  });

  return {
    updateItem,
    data,
    error,
    loading,
  };
};
