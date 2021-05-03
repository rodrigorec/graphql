import { useParams } from 'react-router-dom';
import ItemForm from "src/components/ItemForm";
import {useGetItem} from "src/hooks/useGetItem";
import {Item} from "src/model/item";

interface ChildProps {
    color?: string;
    onClick?: () => void;
  }


const ItemDetailPage: React.FC<ChildProps> = ({ color, onClick, children }) => {
  const { id } = useParams<{ id: string }>();

  const {loading, error, data} = useGetItem(id);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>None</div>;

  const item: Item = data.item as Item;

    return <ItemForm hasToAddItem={false} item={item} />
  };

export default ItemDetailPage;
