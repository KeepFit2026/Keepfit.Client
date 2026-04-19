import { ElementType } from 'react';
import styles from '../../(onboarding)/onboarding/onboarding.module.css';

type SelectionCardProps = {
  icon: ElementType;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export function SelectionCard({ icon: Icon, title, description, isActive, onClick }: SelectionCardProps) {
  return (
    <div
      className={`${styles.selectionCard} ${isActive ? styles.selectionCardActive : ''}`}
      onClick={onClick}
    >
      <Icon className={styles.selectionIcon} size={28} />
      <span className={styles.selectionTitle}>{title}</span>
      <span className={styles.selectionDesc}>{description}</span>
    </div>
  );
}