import { useState } from 'react';
import styles from './TooltipComponent.module.scss';
import { TooltipComponent } from './TooltipComponent';

interface TooltipIconComponentProps {
  text: string;
  link: string;
}

export const TooltipIcon: React.FC<TooltipIconComponentProps> = ({
  text,
  link,
}) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className={styles.tooltipWrapper}>
      <div
        className={styles.tooltipIconContainer}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        <p>i</p>
      </div>
      {visible ? (
        <TooltipComponent
          visible={visible}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          content={text}
          link={link}
        />
      ) : null}
    </div>
  );
};
