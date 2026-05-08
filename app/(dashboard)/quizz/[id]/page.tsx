'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/app/lib/axios';
import { DailyQuiz, Question, UserAnswer } from '@/app/types/Question';
import styles from './styles.module.css';
import { useUser } from '@/app/providers/userProvider';

export default function QuizPlayer() {
  const { id } = useParams();
  const router = useRouter();

  const { refetchUser } = useUser();

  const [quizData, setQuizData] = useState<DailyQuiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [startTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const response = await api.get(`/api/quizz/${id}`)
        setQuizData(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizz();
  }, [id]);

  const currentQuestion = quizData?.quizz.questions[currentIndex];
  const isLastQuestion = currentIndex === (quizData?.quizz.questions.length || 0) - 1;
  const progress = quizData ? ((currentIndex + 1) / quizData.quizz.questions.length) * 100 : 0;

  const handleNext = async () => {
    if (!selectedAnswerId || !currentQuestion) return;

    const updatedAnswers = [...userAnswers, { questionId: currentQuestion.id, answerId: selectedAnswerId }];
    setUserAnswers(updatedAnswers);

    if (isLastQuestion) {
      submitQuiz(updatedAnswers);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswerId(null);
    }
  };

  const submitQuiz = async (finalAnswers: any[]) => {
    setIsSubmitting(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000); // A revoir
    try {
      await api.post(`/api/quizz/${id}/submit`, {
        time_spent: timeSpent,
        answers: finalAnswers,
      });

      if(refetchUser) {
        await refetchUser();
      }

      router.push('/quizz');
    } catch (err) {
      alert("Erreur lors de l'envoi");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className={styles.loader}>Chargement du quiz...</div>;
  if (!quizData || !currentQuestion) return <div>Quiz introuvable.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.meta}>
          <span>Question {currentIndex + 1} sur {quizData.quizz.questions.length}</span>
          <span className={styles.timer}>{quizData.quizz.title}</span>
        </div>
      </header>

      <main className={styles.quizCard}>
        <h2 className={styles.questionText}>{currentQuestion.content}</h2>

        <div className={styles.answersGrid}>
          {currentQuestion.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => setSelectedAnswerId(answer.id)}
              className={`${styles.answerBtn} ${selectedAnswerId === answer.id ? styles.selected : ''}`}
            >
              {answer.content}
            </button>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <button
          onClick={handleNext}
          disabled={!selectedAnswerId || isSubmitting}
          className={styles.nextBtn}
        >
          {isSubmitting ? 'Envoi...' : (isLastQuestion ? 'Terminer' : 'Suivant')}
        </button>
      </footer>
    </div>
  );
}