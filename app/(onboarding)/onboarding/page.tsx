'use client';

import { useState } from 'react';
import {
  Building2,
  GraduationCap,
  BookOpen,
  Users,
  Trophy,
  Medal,
  Target,
  Flag,
  Wind,
  Compass
} from 'lucide-react';
import styles from './onboarding.module.css';
import api from '@/app/lib/axios';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    school: '',
    grade: '',
    sports_profile: '',
    primary_goal: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
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
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Erreur lors de la sauvegarde.');
      } else {
        setErrorMessage('Impossible de joindre le serveur.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    setErrorMessage('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* Header avec Stepper */}
        <div className={styles.header}>
          <div className={styles.stepper}>
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`${styles.stepDot} ${
                  step === num ? styles.stepDotActive : ''
                } ${step > num ? styles.stepDotDone : ''}`}
              >
                {step > num ? '✓' : num}
              </div>
            ))}
          </div>

          <div className={styles.headerContent} key={`header-${step}`}>
            {step === 1 && (
              <>
                <h1 className={styles.title}>Configuration du profil</h1>
                <p className={styles.subtitle}>Ces informations nous permettent de te rattacher à ton établissement.</p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className={styles.title}>Profil sportif scolaire</h1>
                <p className={styles.subtitle}>Quel est ton niveau d'engagement dans le sport au sein de ton cursus ?</p>
              </>
            )}
            {step === 3 && (
              <>
                <h1 className={styles.title}>Objectif principal</h1>
                <p className={styles.subtitle}>Ce qui te motive le plus pour utiliser l'application cette année.</p>
              </>
            )}
          </div>
        </div>

        {/* Contenu Dynamique avec animation */}
        <div className={styles.content}>
          <div className={styles.animatedStep} key={`content-${step}`}>

            {/* ÉTAPE 1 : Identité Scolaire */}
            {step === 1 && (
              <div className={styles.stepContent}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Établissement scolaire</label>
                  <div className={styles.inputWrapper}>
                    <Building2 className={styles.inputIcon} size={18} />
                    <input
                      type="text"
                      className={styles.inputWithIcon}
                      placeholder="Ex: Lycée Jean Moulin"
                      value={formData.school}
                      onChange={(e) => setFormData({...formData, school: e.target.value})}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Niveau / Classe</label>
                  <div className={styles.inputWrapper}>
                    <GraduationCap className={styles.inputIcon} size={18} />
                    <input
                      type="text"
                      className={styles.inputWithIcon}
                      placeholder="Ex: 2nde B, Terminale..."
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : Engagement Sportif */}
            {step === 2 && (
              <div className={styles.selectionGrid}>
                <div
                  className={`${styles.selectionCard} ${formData.sports_profile === 'eps_only' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, sports_profile: 'eps_only'})}
                >
                  <BookOpen className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Pratique EPS</span>
                  <span className={styles.selectionDesc}>Uniquement pendant les cours obligatoires</span>
                </div>
                <div
                  className={`${styles.selectionCard} ${formData.sports_profile === 'unss' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, sports_profile: 'unss'})}
                >
                  <Users className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Licencié(e) UNSS</span>
                  <span className={styles.selectionDesc}>Inscrit(e) à l'Association Sportive de l'école</span>
                </div>
                <div
                  className={`${styles.selectionCard} ${formData.sports_profile === 'club' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, sports_profile: 'club'})}
                >
                  <Trophy className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Pratique en Club</span>
                  <span className={styles.selectionDesc}>Sport en extérieur (Fédérations, clubs...)</span>
                </div>
                <div
                  className={`${styles.selectionCard} ${formData.sports_profile === 'section' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, sports_profile: 'section'})}
                >
                  <Medal className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Section Sportive</span>
                  <span className={styles.selectionDesc}>Cursus aménagé / Sport Études</span>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : Objectif Scolaire/Personnel */}
            {step === 3 && (
              <div className={styles.selectionGrid}>
                <div
                  className={`${styles.selectionCard} ${formData.primary_goal === 'exam' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, primary_goal: 'exam'})}
                >
                  <Target className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Préparer une évaluation</span>
                  <span className={styles.selectionDesc}>Viser une bonne note en EPS (Bac, Brevet...)</span>
                </div>
                <div
                  className={`${styles.selectionCard} ${formData.primary_goal === 'competition' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, primary_goal: 'competition'})}
                >
                  <Flag className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Compétitions UNSS</span>
                  <span className={styles.selectionDesc}>Préparer les tournois inter-établissements</span>
                </div>
                <div
                  className={`${styles.selectionCard} ${formData.primary_goal === 'decompress' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, primary_goal: 'decompress'})}
                >
                  <Wind className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Se défouler</span>
                  <span className={styles.selectionDesc}>Évacuer le stress des cours et s'aérer l'esprit</span>
                </div>
                <div
                  className={`${styles.selectionCard} ${formData.primary_goal === 'discovery' ? styles.selectionCardActive : ''}`}
                  onClick={() => setFormData({...formData, primary_goal: 'discovery'})}
                >
                  <Compass className={styles.selectionIcon} size={28} />
                  <span className={styles.selectionTitle}>Découverte</span>
                  <span className={styles.selectionDesc}>Tester de nouvelles activités sportives</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {errorMessage && (
          <div className={styles.errorBanner}>
            {errorMessage}
          </div>
        )}

        <div className={styles.footer}>
          {step > 1 ? (
            <button
              className={styles.btnBack}
              onClick={handleBack}
              disabled={isLoading}
            >
              Retour
            </button>
          ) : (
            <div></div>
          )}

          <button
            className={styles.btnNext}
            onClick={handleNext}
            disabled={
              isLoading ||
              (step === 1 && (!formData.school || !formData.grade)) ||
              (step === 2 && !formData.sports_profile) ||
              (step === 3 && !formData.primary_goal)
            }
          >
            {isLoading
              ? "Sauvegarde..."
              : (step === totalSteps ? "Terminer la configuration" : "Étape suivante")
            }
          </button>
        </div>

      </div>
    </div>
  );
}