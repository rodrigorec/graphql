import { useMutation } from '@apollo/client';
import { CreateInputItem } from '__generated__/globalTypes';
import {
    createItem,
    createItemVariables,
} from 'src/graphql/operations/mutations/__generated__/createItem';
import { GetItems } from 'src/graphql/operations/queries/__generated__/GetItems';
import { GET_ITEMS } from 'src/graphql/operations/queries/getItemList';
import { CREATE_ITEM } from 'src/graphql/operations/mutations/addItem';

export const UseAddItem = (inputValues: CreateInputItem) => {
    const { title, description } = inputValues;
    const [mutateItem, { error, data, loading }] = useMutation<createItem, createItemVariables>(
        CREATE_ITEM,
        {
            variables: {
                input: { title, description },
            },
            update(cache, { data }) {
                const newItem = data?.createItem;
                const existingItems = cache.readQuery<GetItems>({
                    query: GET_ITEMS,
                });
                if (existingItems?.items && newItem) {
                    cache.writeQuery({
                        query: GET_ITEMS,
                        data: {
                            items: [...existingItems.items, newItem],
                        },
                    });
                }
            },
        },
    );

    return {
        mutateItem,
        data,
        error,
        loading,
    };
};
