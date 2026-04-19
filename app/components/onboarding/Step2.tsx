import { BookOpen, Users, Trophy, Medal } from 'lucide-react';
import styles from '../../(onboarding)/onboarding/onboarding.module.css';
import { SelectionCard } from './SelectionCard';

type StepProps = {
  formData: { school: string; grade: string; sports_profile: string; primary_goal: string };
  updateFormData: (data: any) => void;
}

export function Step2Sports({ formData, updateFormData }: StepProps) {
  const options = [
    { id: 'eps_only', icon: BookOpen, title: 'Pratique EPS', desc: 'Uniquement pendant les cours obligatoires' },
    { id: 'unss', icon: Users, title: 'Licencié(e) UNSS', desc: "Inscrit(e) à l'Association Sportive de l'école" },
    { id: 'club', icon: Trophy, title: 'Pratique en Club', desc: 'Sport en extérieur (Fédérations, clubs...)' },
    { id: 'section', icon: Medal, title: 'Section Sportive', desc: 'Cursus aménagé / Sport Études' },
  ];

  return (
    <div className={styles.selectionGrid}>
      {options.map((opt) => (
        <SelectionCard
          key={opt.id}
          icon={opt.icon}
          title={opt.title}
          description={opt.desc}
          isActive={formData.sports_profile === opt.id}
          onClick={() => updateFormData({ sports_profile: opt.id })}
        />
      ))}
    </div>
  );
}