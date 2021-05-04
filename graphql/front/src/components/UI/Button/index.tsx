import cn from "classnames";
import "./styles.scss";
import ScreenSize from "src/hocs/ScreenSize";

interface ButtonProps {
  className?: string;
  isMobile?: boolean;
  text: string;
  handleClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  isMobile = true,
  text,
  handleClick,
}) => (
  <button
    className={cn("button", { "button--sm": isMobile }, className)}
    onClick={handleClick}
  >
    {text}
  </button>
);

export default ScreenSize(Button);
