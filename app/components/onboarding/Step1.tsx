import { Building2, GraduationCap } from 'lucide-react';
import styles from '../../(onboarding)/onboarding/onboarding.module.css';
import { InputField } from './InputField';

type StepProps = {
  formData: { school: string; grade: string; sports_profile: string; primary_goal: string };
  updateFormData: (data: any) => void;
}

export function Step1School({ formData, updateFormData }: StepProps) {
  return (
    <div className={styles.stepContent}>
      <InputField
        label="Établissement scolaire"
        icon={Building2}
        placeholder="Ex: Lycée Jean Moulin"
        value={formData.school}
        onChange={(val) => updateFormData({ school: val })}
      />
      <InputField
        label="Niveau / Classe"
        icon={GraduationCap}
        placeholder="Ex: 2nde B, Terminale..."
        value={formData.grade}
        onChange={(val) => updateFormData({ grade: val })}
      />
    </div>
  );
}