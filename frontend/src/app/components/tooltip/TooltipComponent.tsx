import React, { useEffect, useRef, useState } from 'react';
import styles from './TooltipComponent.module.scss';

interface TooltipComponentProps {
  visible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
  content: string;
  link: string;
}

export const TooltipComponent: React.FC<TooltipComponentProps> = ({
  showTooltip,
  hideTooltip,
  content,
  link,
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const adjustPosition = () => {
      const tooltip = tooltipRef.current;
      if (tooltip) {
        const rect = tooltip.getBoundingClientRect();
        const offset = 25;
        const newStyle: React.CSSProperties = {};

        if (rect.left < offset) {
          newStyle.left = offset - rect.left;
        }
        if (rect.right > window.innerWidth - offset) {
          newStyle.left = -(rect.right - (window.innerWidth - offset));
        }
        if (rect.top < offset) {
          newStyle.top = offset - rect.top;
        }
        if (rect.bottom > window.innerHeight - offset) {
          newStyle.top = -(rect.bottom - (window.innerHeight - offset));
        }

        setTooltipStyle(newStyle);
      }
    };

    adjustPosition();
    window.addEventListener('resize', adjustPosition);
    return () => window.removeEventListener('resize', adjustPosition);
  }, []);

  return (
    <section
      ref={tooltipRef}
      className={styles.tooltipComponentContainer}
      style={tooltipStyle}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <p>{content}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </section>
  );
};
