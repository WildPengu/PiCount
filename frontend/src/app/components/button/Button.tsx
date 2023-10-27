import { Color } from '../../types/Enums';
import styles from './Button.module.scss';


export interface ButtonProps {
    children: string;
    backgroundColor?: Color;
    isDisabled?: boolean;
    onClick?: () => void;
}

const Button = ({ 
    children, 
    onClick, 
    backgroundColor = Color.violet,
    isDisabled = false,
}: ButtonProps) => { 

    return (
        <button 
            className={styles.Button} 
            style={{ backgroundColor: isDisabled ? Color.gray : backgroundColor }} 
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default Button;