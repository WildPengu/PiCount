import { useContext, useState } from 'react';
import { ThemeContext } from '../../Theme';
import { TooltipComponent } from './TooltipComponent';
import styles from './TooltipComponent.module.scss';

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
      <TooltipComponent
        visible={visible}
        showTooltip={showTooltip}
        hideTooltip={hideTooltip}
        content={text}
        link={link}
      />
    </div>
  );
};
