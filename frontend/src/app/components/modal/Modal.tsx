import { ReactNode } from 'react';
import styles from './Modal.module.scss';

export interface ModalProps {
    children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
    return (
        <div className={styles.ModalContainer}>
            {children}
        </div>
    )
};