import styles from './Button.module.scss';

export enum ButtonBgColor {
    violet = '#9530ea',
    gray = '#bbb',
}

export interface ButtonProps {
    children: string;
    backgroundColor?: ButtonBgColor;
}

const Button = ({ children, backgroundColor = ButtonBgColor.violet }: ButtonProps) => { 

    return (
        <button className={styles.Button} style={{backgroundColor: backgroundColor}}>
            {children}
        </button>
    );
};

export default Button;