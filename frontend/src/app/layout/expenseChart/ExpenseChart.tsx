import { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import styles from './ExpenseChart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartColumn, faChartPie, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../components/modal/Modal';
import { FilterPanel } from '../../components/filterPanel/FilterPanel';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { appSettings } from '../../config';
import { PieChartComponent } from '../../components/charts/pieChart/PieChart';
import { Loader } from '../../components/loader/Loader';
import { DataItems } from '../../../types/Chart';
import { ChartItem } from '../../components/charts/chartItem/ChartItem';


export const ExpenseChart = () => {

    const [isModalSortedVisible, setIsModalSortedVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dataChart, setDataChart] = useState<DataItems>({ categories: [] });
    
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
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.ExpenseChartContainer}>
                    <div className={styles.TotalAmountHeader}>
                        <h3>Total Expenses: <span>{dataChart.totalAmount} ZŁ</span></h3>
                    </div>
                    <div className={styles.ChartsContainer}>
                        <PieChartComponent 
                            dataChart={dataChart}
                        />
                        <div className={styles.ChartsItemsContainer}>
                            {dataChart.categories.map((category) => (
                                <ChartItem 
                                    categoryItem={category}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                )
            } 
        </div>
    );
};