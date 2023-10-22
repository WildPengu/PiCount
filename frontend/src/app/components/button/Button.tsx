import styles from './Button.module.scss';

interface ButtonProps {
    children: string;
}

const Button = ({ children }: ButtonProps) => {
    return <button className={styles.Btn}>{children}</button>;
};

export default Button;