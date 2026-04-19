import { ElementType } from 'react';
import styles from '../../(onboarding)/onboarding/onboarding.module.css';

type InputFieldProps = {
  label: string;
  icon: ElementType;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function InputField({ label, icon: Icon, value, onChange, placeholder }: InputFieldProps) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <Icon className={styles.inputIcon} size={18} />
        <input
          type="text"
          className={styles.inputWithIcon}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}