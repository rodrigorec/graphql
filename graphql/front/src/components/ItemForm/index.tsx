import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UseAddItem } from "src/hooks/useAddItem";
import { UseUpdateItem } from "src/hooks/useUpdateItem";
import { Item } from "src/model/item";

interface ItemFormProps {
  className?: string;
  hasToAddItem?: boolean;
  item?: Item;
}

const ItemForm: React.FC<ItemFormProps> = ({
  className = "",
  hasToAddItem = true,
  item = {
    id: "",
    title: "",
    description: "",
  },
}) => {
  const history = useHistory();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const {
    addItem,
    data: addNewItemData,
    loading: addNewItemLoading,
    error: addNewItemError,
  } = UseAddItem({
    title,
    description,
  });

  const {
    updateItem,
    data: updateNewItemData,
    loading: updateNewItemLoading,
    error: updateNewItemError,
  } = UseUpdateItem(item.id, {
    title,
    description,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasToAddItem) {
      addItem();
    } else {
      updateItem();
    }
    setTitle("");
    setDescription("");
  };

  const renderTitle = () => (hasToAddItem ? "Add" : "Update");

  useEffect(() => {
    if (updateNewItemData?.updateItem) {
      history.push("/");
    }
  }, [updateNewItemData]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>{`${renderTitle()} item`}</h3>
      {addNewItemLoading || (updateNewItemLoading && <div>Loading...</div>)}
      {addNewItemError || updateNewItemError ? (
        <p>There was an error! {addNewItemError?.message || updateNewItemError?.message}</p>
      ) : null}
      {!hasToAddItem && (
        <input type="text" disabled value={item.id} />
      )}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="submit"
        value={renderTitle()}
        disabled={title === "" || description === ""}
      />
    </form>
  );
};

export default ItemForm;
