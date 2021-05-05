import { useParams } from "react-router-dom";
import ItemForm from "src/components/ItemForm";
import { useGetItem } from "src/hooks/useGetItem";
import { Item } from "src/model/item";
import Error from "src/components/Error";
import Heading from "src/components/UI/Heading";
import { getErrorMessage } from "src/utils/helpers";

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useGetItem(id);
  if (loading) return <Heading>Loading...</Heading>;
  if (error) return <Error text={getErrorMessage(error)} />;
  if (!data || data?.item === null) {
    return <Error text="Not found!" />;
  }

  const item: Item = data.item as Item;

  return <ItemForm hasToAddItem={false} item={item} />;
};

export default ItemDetailPage;
