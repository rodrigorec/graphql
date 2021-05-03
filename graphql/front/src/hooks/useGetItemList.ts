import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "src/graphql/operations/queries/getItemList";
import { GetItems } from "src/graphql/operations/queries/__generated__/GetItems";

export const useGetItemList = () => {
  const { loading, error, data } = useQuery<GetItems>(GET_ITEMS);

  return {
    loading,
    error,
    data,
  };
};
