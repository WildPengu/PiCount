import styles from './TopPanel.module.scss';

export interface TopPanelProps {
    children: JSX.Element;
    headerText: string;
};

export const TopPanel = ({ children, headerText }: TopPanelProps) => {
    return (
        <div className={styles.TopPanel}>
            <h2 className={styles.TopPanelHeader}>{headerText}</h2>
            {children}
        </div>
    );
};