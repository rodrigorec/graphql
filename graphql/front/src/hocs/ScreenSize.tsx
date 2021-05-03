import { useState, useEffect } from "react";
import { LIMIT_DESKTOP_SIZE } from "src/utils/constants";

const isMobileSize = () => {
  const {
    body: { clientWidth },
  } = document;
  return clientWidth < LIMIT_DESKTOP_SIZE;
};

function CheckProps<P>(props: P) {
  const [isMobile, setIsMobile] = useState(isMobileSize());

  useEffect(() => {
    const updateSize = () => setIsMobile(isMobileSize());
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  return { ...props, isMobile };
}

function ScreenSize<P>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithSizeView = (props: P) => {
    const processedProps = CheckProps(props);
    return <WrappedComponent {...processedProps} />;
  };
  return ComponentWithSizeView;
}

export default ScreenSize;
