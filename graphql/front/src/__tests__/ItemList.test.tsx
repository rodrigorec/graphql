import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ITEMS } from "src/graphql/operations/queries/getItemList";
const { act } = TestRenderer;
import ItemList from "src/components/ItemList";

const mocks = [
  {
    request: {
      query: GET_ITEMS,
    },
    result: {
      data: {
        items: [
          {
            id: "rJKAbDd_z",
            title: "Frontend Developer",
            description:
              "We are looking for a Frontend Developer familiar with React.",
          },
        ],
      },
    },
  },
];

let component: any;
beforeEach(() => {
  component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ItemList />
    </MockedProvider>
  );
});

describe("ItemList", () => {
  it("renders itemList without error", () => {
    const tree = component.toJSON() as TestRenderer.ReactTestRendererJSON;
    expect(tree.children).toContain("Loading...");
  });

  it("should render the item list and get the title of item", async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const testInstance = component.root;
      expect(
        testInstance.findByProps({ className: "item-card__container__info__dsc" })
          .children
      ).toEqual(["Frontend Developer"]);
    });
  });
});
