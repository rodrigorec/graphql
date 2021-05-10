import cn from 'classnames';
import './styles.scss';
import Box from 'src/components/UI/Box';
import Button from 'src/components/UI/Button';
import ScreenSize from 'src/hocs/ScreenSize';

interface ItemCardProps {
    className?: string;
    isMobile?: boolean;
    title: string;
    description: string;
    onClickDetail: () => void;
    onClickDelete: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
    className = '',
    isMobile = true,
    title,
    description,
    onClickDetail,
    onClickDelete,
}) => (
    <div className={cn('item-card', { 'item-card--sm': isMobile }, className)}>
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

export default ScreenSize(ItemCard);
