import { ReactNode, useContext } from 'react';
import styles from './Modal.module.scss';
import { ThemeContext } from '../../Theme';

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.ModalContainer} ${theme}Container`}>
      {children}
    </div>
  );
};
