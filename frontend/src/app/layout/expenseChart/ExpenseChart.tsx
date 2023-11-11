import { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import styles from './ExpenseChart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartColumn, faChartPie, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../components/modal/Modal';
import { FilterPanel } from '../../components/filterPanel/FilterPanel';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { appSettings } from '../../config';
import { PieChartComponent } from '../../components/pieChart/PieChart';
import { Loader } from '../../components/loader/Loader';

export const ExpenseChart = () => {

    const [isModalSortedVisible, setIsModalSortedVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetch(`${appSettings.apiHost}:${appSettings.apiPort}/expenses/diagrams/${appSettings.user_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDataChart(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Błąd pobierania danych:', error);
                setLoading(false);
            });
    }, []);
    
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
                        <FilterPanel setIsModalVisible={setIsModalSortedVisible} />
                    </Modal>}
                </div>
            </TopPanel>
            <div className={styles.ExpenseChartContainer}>
            {loading ? (
                <Loader />
                ) : (
                    <PieChartComponent 
                    dataChart={dataChart}
                />
                )}
                
            </div>
        </div>
    );
};