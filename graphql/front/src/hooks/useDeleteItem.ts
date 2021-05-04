import { useMutation } from "@apollo/client";
import { DELETE_ITEM } from "src/graphql/operations/mutations/deleteItem";
import {
  deleteItem,
  deleteItemVariables,
} from "src/graphql/operations/mutations/__generated__/deleteItem";
import { GetItems } from "src/graphql/operations/queries/__generated__/GetItems";
import { GET_ITEMS } from "src/graphql/operations/queries/getItemList";

export const useDeleteItem = () => {
  const [deleteItem, { error }] = useMutation<
    deleteItem,
    deleteItemVariables
  >(DELETE_ITEM, {
    update(cache, { data }) {
      const existingItems = cache.readQuery<GetItems>({
        query: GET_ITEMS,
      });
      if (existingItems?.items && data?.deleteItem) {
        cache.writeQuery({
          query: GET_ITEMS,
          data: {
            items: [
              ...existingItems.items.filter(
                (item) => item?.id !== data?.deleteItem
              ),
            ],
          },
        });
      }
    },
  });

  return {
    deleteItem,
    error,
  };
};
