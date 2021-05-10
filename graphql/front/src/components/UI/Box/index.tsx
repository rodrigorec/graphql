import cn from 'classnames';
import './styles.scss';
import ScreenSize from 'src/hocs/ScreenSize';

interface BoxrProps {
    className?: string;
    isMobile?: boolean;
    children?: any;
}

const Box: React.FC<BoxrProps> = ({ className = '', isMobile = true, children }) => (
    <div
        className={cn(
            'box',
            {
                'box--sm': isMobile,
            },
            className,
        )}
    >
        {children}
    </div>
);

export default ScreenSize(Box);
