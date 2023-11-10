import { useState } from 'react';
import Button from '../../components/button/Button';
import styles from './ExpenseChart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartColumn, faChartPie, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../components/modal/Modal';
import { SortedPanel } from '../../components/sortedPanel/SortedPanel';
import { TopPanel } from '../../components/topPanel/TopPanel';

export const ExpenseChart = () => {
    const [isModalSortedVisible, setIsModalSortedVisible] = useState(false);
    
    return (
        <div className={styles.ExpenseChart}>
            <TopPanel headerText="My Chart">
                <div className={styles.TopPanelContainer}>
                    <Button>
                        <FontAwesomeIcon icon={faChartPie} />
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faChartColumn} />
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faChartBar} />
                    </Button>
                    <Button 
                        onClick={() => setIsModalSortedVisible(true)}
                    >
                        <FontAwesomeIcon icon={faFilter} />
                    </Button>
                    {isModalSortedVisible && <Modal>
                        <SortedPanel setIsModalVisible={setIsModalSortedVisible}/>
                    </Modal>}
                </div>
            </TopPanel>
        </div>
    );
};