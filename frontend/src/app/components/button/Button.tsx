import styles from './Button.module.scss';

export enum ButtonBgColor {
    violet = '#9530ea',
    gray = '#bbb',
}

export interface ButtonProps {
    children: string;
    backgroundColor?: ButtonBgColor;
    onClick?: () => void;
}

const Button = ({ children, onClick, backgroundColor = ButtonBgColor.violet }: ButtonProps) => { 

    return (
        <button className={styles.Button} style={{backgroundColor: backgroundColor}} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;