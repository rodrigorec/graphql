import { useHistory } from "react-router-dom";
import { Items } from "src/model/items";
import ItemCard from "src/components/ItemCard";
import { useDeleteItem } from "src/hooks/useDeleteItem";
import cn from "classnames";
import "./styles.scss";
import ScreenSize from "src/hocs/ScreenSize";
import Error from "src/components/Error";
import { getErrorMessage } from "src/utils/helpers";

interface ChildProps {
  itemList: Items;
  className?: string;
  isMobile?: boolean;
}

const ItemList: React.FC<ChildProps> = ({
  itemList,
  isMobile = true,
  className = "",
}) => {
  const history = useHistory();
  const { deleteItem, error } = useDeleteItem();

  const handleDelete = async (id: string) => {
    try {
      await deleteItem({ variables: { id } });
    } catch (e) {
      console.log(e);
    }
  };

  if (error) return <Error text={getErrorMessage(error)} />;

  return (
    <div
      className={cn(
        "item-list",
        {
          "item-list--sm": isMobile,
        },
        className
      )}
    >
      {itemList.map(({ id, title, description }) => (
        <ItemCard
          key={id}
          className="item-list__card"
          title={title}
          description={description}
          onClickDetail={() => history.push(`/item-detail/${id}`)}
          onClickDelete={() => handleDelete(id)}
        />
      ))}
    </div>
  );
};

export default ScreenSize(ItemList);
