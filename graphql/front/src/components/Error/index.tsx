import cn from "classnames";
import "./styles.scss";
import ScreenSize from "src/hocs/ScreenSize";
import Heading from "src/components/UI/Heading";

interface ErrorProps {
  className?: string;
  isMobile?: boolean;
  text: string;
}

const Error: React.FC<ErrorProps> = ({
  className = "",
  isMobile = true,
  text,
}) => {
  return (
    <Heading className={cn("error", { "error--sm": isMobile }, className)}>
      {text}
    </Heading>
  );
};

export default ScreenSize(Error);
