import { Target, Flag, Wind, Compass } from 'lucide-react';
import styles from '../../(onboarding)/onboarding/onboarding.module.css';
import { SelectionCard } from './SelectionCard';

type StepProps = {
  formData: { school: string; grade: string; sports_profile: string; primary_goal: string };
  updateFormData: (data: any) => void;
}

export function Step3Goals({ formData, updateFormData }: StepProps) {
  const options = [
    { id: 'exam', icon: Target, title: 'Préparer une évaluation', desc: 'Viser une bonne note en EPS (Bac, Brevet...)' },
    { id: 'competition', icon: Flag, title: 'Compétitions UNSS', desc: 'Préparer les tournois inter-établissements' },
    { id: 'decompress', icon: Wind, title: 'Se défouler', desc: "Évacuer le stress des cours et s'aérer l'esprit" },
    { id: 'discovery', icon: Compass, title: 'Découverte', desc: 'Tester de nouvelles activités sportives' },
  ];

  return (
    <div className={styles.selectionGrid}>
      {options.map((opt) => (
        <SelectionCard
          key={opt.id}
          icon={opt.icon}
          title={opt.title}
          description={opt.desc}
          isActive={formData.primary_goal === opt.id}
          onClick={() => updateFormData({ primary_goal: opt.id })}
        />
      ))}
    </div>
  );
}