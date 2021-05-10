import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_ITEM } from 'src/graphql/operations/mutations/addItem';
import { UseAddItem } from 'src/hooks/useAddItem';
const { act } = TestRenderer

const ItemFormTest = () => {
    const { mutateItem, data, loading } = UseAddItem({
        title: 'Test title',
        description: 'Test description',
    });

    if (loading) return <p>Loading...</p>;
    if (data) return <p>Created!</p>;

    return <button onClick={() => mutateItem()}>Create Item</button>;
};

const mocks = [
    {
        request: {
            query: CREATE_ITEM,
            variables: {
                input: {
                    title: 'Test title',
                    description: 'Test description',
                },
            },
        },
        result: {
            data: {
                createItem: {
                    id: 'hwAsA',
                    title: 'new position',
                    description: 'other',
                },
            },
        },
    },
];

let component: any;
beforeEach(() => {
    component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ItemFormTest />
        </MockedProvider>,
    );
});

describe('CreateItemForm', () => {
    it('renders itemForm to create an item successfully', async () => {
        await act(async () => {
            const button = component.root.findByType('button');
            button.props.onClick();
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
        const tree = component.toJSON() as TestRenderer.ReactTestRendererJSON;
        expect(tree.children).toContain('Created!');
    });
    it('renders loading when mutation is fired', () => {
        act(() => {
            const button = component.root.findByType('button');
            button.props.onClick();
        });
        const tree = component.toJSON() as TestRenderer.ReactTestRendererJSON;
        expect(tree.children).toContain('Loading...');
    });
});
