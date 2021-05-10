import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { UseAddItem } from 'src/hooks/useAddItem';
import { UseUpdateItem } from 'src/hooks/useUpdateItem';
import { Item } from 'src/model/item';
import Heading from 'src/components/UI/Heading';
import './styles.scss';
import { getErrorMessage } from 'src/utils/helpers';
import Error from 'src/components/Error';

interface ItemFormProps {
    className?: string;
    hasToAddItem?: boolean;
    item?: Item;
}

const ItemForm: React.FC<ItemFormProps> = ({
    className = '',
    hasToAddItem = true,
    item = {
        id: '',
        title: '',
        description: '',
    },
}) => {
    const history = useHistory();
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);

    const { mutateItem, data, loading, error } = hasToAddItem
        ? UseAddItem({
              title,
              description,
          })
        : UseUpdateItem(item.id, {
              title,
              description,
          });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await mutateItem();
            if (result.data && ('updateItem' in result.data || 'createItem' in result.data)) {
                setTitle('');
                setDescription('');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const renderTitle = () => (hasToAddItem ? 'Add' : 'Update');

    useEffect(() => {
        if (data && 'updateItem' in data) {
            history.push('/');
        }
    }, [data, history]);

    if (error) return <Error text={getErrorMessage(error)} />;

    return (
        <form className={cn('item-form', className)} onSubmit={handleSubmit}>
            <Heading className="item-form__header">{`${renderTitle()} item`}</Heading>
            <div className="item-form__container">
                {!hasToAddItem && <input type="text" disabled value={item.id} />}
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
                    disabled={title === '' || description === ''}
                />
                {loading && <Heading>Loading...</Heading>}
            </div>
        </form>
    );
};

export default ItemForm;
