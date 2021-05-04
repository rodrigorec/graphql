import { Items } from "src/model/items";
import { useGetItemList } from "src/hooks/useGetItemList";
import List from "./item-list";
import Heading from "src/components/UI/Heading";

const ItemList = () => {
  const { loading, error, data } = useGetItemList();

  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>Error</Heading>;
  if (!data) return <Heading>None</Heading>;

  const items: Items = data.items as Items;

  return <List itemList={items} />;
};

export default ItemList;
