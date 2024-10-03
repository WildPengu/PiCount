import { useTranslation } from 'react-i18next';
import '../../../i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataItem } from '../../../../types/Chart';
import styles from './ChartItem.module.scss';
import {
  IconDefinition,
  faBagShopping,
  faCar,
  faCartShopping,
  faChildren,
  faDollarSign,
  faGift,
  faHeartPulse,
  faHouse,
  faPaw,
  faSpa,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

interface IconMappings {
  [key: string]: IconDefinition;
}

export const ChartItem: React.FC<{ categoryItem: DataItem }> = ({
  categoryItem,
}) => {
  const { category, value, color, image } = categoryItem;
  const { t } = useTranslation();

  const iconMappings: IconMappings = {
    faPaw: faPaw,
    faCartShopping: faCartShopping,
    faBagShopping: faBagShopping,
    faUtensils: faUtensils,
    faCar: faCar,
    faGift: faGift,
    faHouse: faHouse,
    faChildren: faChildren,
    faHeartPulse: faHeartPulse,
    faSpa: faSpa,
    faDollarSign: faDollarSign,
  };

  const selectedIcon = image ? iconMappings[image] : undefined;

  return (
    <div className={styles.ChartItem}>
      <h4 style={{ color: color }}>{t(`category.${category}`)}</h4>
      <div className={styles.ChartItemIco} style={{ backgroundColor: color }}>
        <FontAwesomeIcon icon={selectedIcon || faDollarSign} color="white" />
      </div>
      <h4 className={styles.ChartItemAmount} style={{ color: color }}>
        {value.toFixed(2)} ZŁ
      </h4>
    </div>
  );
};
