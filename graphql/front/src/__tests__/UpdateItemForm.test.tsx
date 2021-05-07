import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { UPDATE_ITEM } from "src/graphql/operations/mutations/updateItem";
const { act } = TestRenderer;
import { UseUpdateItem } from "src/hooks/useUpdateItem";

const ItemFormTest = () => {
  const { mutateItem, data, loading } = UseUpdateItem("rJKAbDd_z", {
    title: "Test title",
    description: "Test description",
  });

  if (loading) return <p>Loading...</p>;
  if (data) return <p>Updated!</p>;

  return <button onClick={() => mutateItem()}>Create Item</button>;
};

const mocks = [
  {
    request: {
      query: UPDATE_ITEM,
      variables: {
        id: "rJKAbDd_z",
        input: {
          title: "Test title",
          description: "Test description",
        },
      },
    },
    result: {
      data: {
        updateItem: {
          id: "rJKAbDd_z",
          title: "Test title",
          description: "Test description",
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
    </MockedProvider>
  );
});

describe("UpdateItemForm", () => {
  it("renders itemForm to update an item successfully", async () => {
    await act(async () => {
      const button = component.root.findByType("button");
      button.props.onClick();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const tree = component.toJSON() as TestRenderer.ReactTestRendererJSON;
    expect(tree.children).toContain("Updated!");
  });
  it("renders loading when mutation is fired", () => {
    act(() => {
      const button = component.root.findByType("button");
      button.props.onClick();
    });
    const tree = component.toJSON() as TestRenderer.ReactTestRendererJSON;
    expect(tree.children).toContain("Loading...");
  });
});
