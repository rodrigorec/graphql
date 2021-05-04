import { useHistory } from "react-router-dom";
import { Items } from "src/model/items";
import ItemCard from "src/components/ItemCard";
import { useDeleteItem } from "src/hooks/useDeleteItem";
import cn from "classnames";
import "./styles.scss";
import ScreenSize from "src/hocs/ScreenSize";

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

  if (error) return <div>Error</div>;

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
          title={title}
          description={description}
          onClickDetail={() => history.push(`/item-detail/${id}`)}
          onClickDelete={() => deleteItem({ variables: { id } })}
        />
      ))}
    </div>
  );
};

export default ScreenSize(ItemList);
