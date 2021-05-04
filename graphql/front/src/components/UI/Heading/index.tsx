import cn from "classnames";
import "./styles.scss";
import ScreenSize from "src/hocs/ScreenSize";

interface TagProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  tagName?: keyof JSX.IntrinsicElements;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ tagName = "div", ...rest }) => {
  const TagEl = tagName as keyof JSX.IntrinsicElements;
  return <TagEl {...rest} />;
};

interface HeadingProps {
  className?: string;
  isMobile?: boolean;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: any;
}

const Heading: React.FC<HeadingProps> = ({
  className = "",
  isMobile = true,
  level = "h3",
  children,
  ...rest
}) => {
  const getNumberLevel = (levelStr: string): number => parseInt(levelStr[1]);

  return (
    <Tag
      className={cn(
        "heading",
        `heading--${getNumberLevel(level)}`,
        { "heading--sm": isMobile },
        className
      )}
      tagName={level}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default ScreenSize(Heading);
