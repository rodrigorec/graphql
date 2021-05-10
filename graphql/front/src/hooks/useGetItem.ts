import { useQuery } from '@apollo/client';
import { GET_ITEM } from 'src/graphql/operations/queries/getItem';
import { GetItem, GetItemVariables } from 'src/graphql/operations/queries/__generated__/GetItem';

export const useGetItem = (id: string) => {
    const { loading, error, data } = useQuery<GetItem, GetItemVariables>(GET_ITEM, {
        variables: { id },
    });

    return {
        loading,
        error,
        data,
    };
};
