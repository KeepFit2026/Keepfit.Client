import styles from '../../(onboarding)/onboarding/onboarding.module.css';

type StepperProps = {
  currentStep: number;
  totalSteps: number;
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles.stepper}>
      {steps.map((num) => (
        <div
          key={num}
          className={`${styles.stepDot} ${
            currentStep === num ? styles.stepDotActive : ''
          } ${currentStep > num ? styles.stepDotDone : ''}`}
        >
          {currentStep > num ? '✓' : num}
        </div>
      ))}
    </div>
  );
}