'use client';

import { useEffect, useState } from 'react';
import api from '@/app/lib/axios';
import styles from './onboarding.module.css';
import { Stepper } from '@/app/components/onboarding/Stepper';
import { Step1School } from '@/app/components/onboarding/Step1';
import { Step2Sports } from '@/app/components/onboarding/Step2';
import { Step3Goals } from '@/app/components/onboarding/Step3';
import { useUser } from '@/app/providers/userProvider';
import { useRouter } from 'next/navigation';

const STEP_HEADERS = {
  1: { title: 'Configuration du profil', subtitle: 'Ces informations nous permettent de te rattacher à ton établissement.' },
  2: { title: 'Profil sportif scolaire', subtitle: "Quel est ton niveau d'engagement dans le sport au sein de ton cursus ?" },
  3: { title: 'Objectif principal', subtitle: "Ce qui te motive le plus pour utiliser l'application cette année." },
};

const STEPS_COMPONENTS = [
  Step1School,
  Step2Sports,
  Step3Goals
];

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const totalSteps = STEPS_COMPONENTS.length;

  const { user, isLoading: isUserLoading } = useUser();

  console.log(user);

  useEffect(() => {
    if(user?.onboarding_completed) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    school: '',
    grade: '',
    sports_profile: '',
    primary_goal: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await api.post('/api/onboarding', formData);
      if (response.status === 200) {
        window.location.href = response.data.redirect;
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Erreur lors de la sauvegarde.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
    setErrorMessage('');
  };

  const isNextDisabled =
    isLoading ||
    (step === 1 && (!formData.school || !formData.grade)) ||
    (step === 2 && !formData.sports_profile) ||
    (step === 3 && !formData.primary_goal);


  // On récupère dynamiquement le bon composant grâce à l'index du tableau
  const CurrentStepComponent = STEPS_COMPONENTS[step - 1];

  if (isUserLoading || user?.onboarding_completed) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* Header avec Stepper */}
        <div className={styles.header}>
          <Stepper currentStep={step} totalSteps={totalSteps} />

          <div className={styles.headerContent} key={`header-${step}`}>
            <h1 className={styles.title}>{STEP_HEADERS[step as keyof typeof STEP_HEADERS].title}</h1>
            <p className={styles.subtitle}>{STEP_HEADERS[step as keyof typeof STEP_HEADERS].subtitle}</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.animatedStep} key={`content-${step}`}>

            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
            />

          </div>
        </div>

        {errorMessage && (
          <div className={styles.errorBanner}>{errorMessage}</div>
        )}

        <div className={styles.footer}>
          {step > 1 ? (
            <button className={styles.btnBack} onClick={handleBack} disabled={isLoading}>
              Retour
            </button>
          ) : <div />}

          <button
            className={styles.btnNext}
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            {isLoading ? "Sauvegarde..." : (step === totalSteps ? "Terminer la configuration" : "Étape suivante")}
          </button>
        </div>

      </div>
    </div>
  );
}