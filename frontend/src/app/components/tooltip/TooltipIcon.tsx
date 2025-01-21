import { useState } from 'react';
import styles from './TooltipComponent.module.scss';
import { TooltipComponent } from './TooltipComponent';

export const TooltipIcon = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.tooltipWrapper}>
      <div
        className={styles.tooltipIconContainer}
        onMouseEnter={() => {
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
      >
        <p>i</p>
      </div>
      {visible ? <TooltipComponent /> : null}
    </div>
  );
};
