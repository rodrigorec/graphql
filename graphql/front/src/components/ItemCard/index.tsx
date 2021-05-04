import cn from 'classnames';
import './styles.scss';
import Box from 'src/components/UI/Box';
import Button from 'src/components/UI/Button';

interface ItemCardProps {
  className?: string;
  title: string;
  description: string;
  onClickDetail: ()=>void;
  onClickDelete: ()=>void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  className = '',
  title,
  description,
  onClickDetail,
  onClickDelete,
}) => (
  <div className={cn('item-card', className)}>
    <Box className="item-card__container">
      <div className="item-card__container__info">
        <span className="item-card__container__info__dsc">{title}</span>
        <span className="item-card__container__info__subdsc">{description}</span>
      </div>
      <Button handleClick={onClickDetail} text="Detail" />
      <Button handleClick={onClickDelete} text="Delete" />
    </Box>
  </div>
);

export default ItemCard;
