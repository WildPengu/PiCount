import { Color } from '../../types/Enums';
import styles from './Button.module.scss';

export interface ButtonProps {
  children: string | JSX.Element;
  backgroundColor?: Color;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  formAction?: string;
  dataTestId?: string;
}

const Button = ({
  children,
  onClick,
  backgroundColor = Color.violet,
  isDisabled = false,
  type = 'button',
  formAction = '',
  dataTestId,
}: ButtonProps) => {
  return (
    <button
      className={styles.Button}
      style={{ backgroundColor: isDisabled ? Color.gray : backgroundColor }}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      formAction={formAction}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};

export default Button;
