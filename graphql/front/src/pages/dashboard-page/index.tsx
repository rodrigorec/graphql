import { useHistory } from "react-router-dom";
import { Items } from "src/model/items";
import { useGetItemList } from "src/hooks/useGetItemList";
import ItemCard from "src/components/ItemCard";
import ItemForm from "src/components/ItemForm";
import { useDeleteItem } from "src/hooks/useDeleteItem";

interface ChildProps {
  color?: string;
  onClick?: () => void;
}

const DashboardPage: React.FC<ChildProps> = ({ color, onClick, children }) => {
  const history = useHistory();
  const { loading, error: itemListError, data: itemListData } = useGetItemList();
  const {
    deleteItemFn,
    error: deleteItemError,
  } = useDeleteItem();

  if (loading) return <div>Loading...</div>;
  if (itemListError || deleteItemError) return <div>Error</div>;
  if (!itemListData) return <div>None</div>;

  const items: Items = itemListData.items as Items;

  const handleDetailClick = (id: string) => {
    history.push(`/item-detail/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    deleteItemFn({ variables: { id } });
  };

  return (
    <>
      <ItemForm />
      {items.map(({ id, title, description }) => (
        <ItemCard
          key={id}
          title={title}
          description={description}
          onClickDetail={() => handleDetailClick(id)}
          onClickDelete={() => handleDeleteClick(id)}
        />
      ))}
    </>
  );
};

export default DashboardPage;
