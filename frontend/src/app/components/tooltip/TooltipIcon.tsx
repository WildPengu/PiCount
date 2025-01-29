import { useState, useContext } from 'react';
import styles from './TooltipComponent.module.scss';
import { TooltipComponent } from './TooltipComponent';
import { ThemeContext } from '../../Theme';

interface TooltipIconComponentProps {
  text: string;
  link: string;
}

export const TooltipIcon: React.FC<TooltipIconComponentProps> = ({
  text,
  link,
}) => {
  const { theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className={`${styles.tooltipWrapper} ${theme}Tooltip`}>
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
