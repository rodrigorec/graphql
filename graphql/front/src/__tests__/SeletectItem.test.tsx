import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ITEM } from 'src/graphql/operations/queries/getItem';
import { useGetItem } from 'src/hooks/useGetItem';
const { act } = TestRenderer;

const GetItemTest = () => {
    const { loading, data } = useGetItem('rJKAbDd_z');
    if (loading) return <p>Loading...</p>;
    if (data) return <p>Get Item!</p>;
    return <div>Getting item...</div>;
};

const mocks = [
    {
        request: {
            query: GET_ITEM,
            variables: {
                id: 'rJKAbDd_z',
            },
        },
        result: {
            data: {
                item: {
                    id: 'rJKAbDd_z',
                    title: 'new title',
                    description: 'new desc',
                },
            },
        },
    },
];

let component: any;
beforeEach(() => {
    component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <GetItemTest />
        </MockedProvider>,
    );
});

describe('CreateItemForm', () => {
    it('should render the item list and get the title of item', async () => {
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
            const tree = component.toJSON() as TestRenderer.ReactTestRendererJSON;
            expect(tree.children).toContain('Get Item!');
        });
    });
    it('renders loading when mutation is fired', async () => {
        const tree = component.toJSON() as TestRenderer.ReactTestRendererJSON;
        expect(tree.children).toContain('Loading...');
    });
});
