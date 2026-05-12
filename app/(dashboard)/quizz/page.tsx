'use client';

import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useCalendar } from '@/app/hooks/useCalendar';
import { useUser } from '@/app/providers/userProvider';

export default function QuizPage() {
  const {
    viewDate,
    calendarData,
    monthName,
    changeMonth,
    dailyQuiz,
    isLoading,
    selectedDate,
    handleDayClick
  } = useCalendar();

  const router = useRouter();

  const isSelectedDateToday = () => {
    return selectedDate.toDateString() === new Date().toDateString();
  };

  const getDaysDifference = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    const diffTime = selected.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const diffDays = getDaysDifference();

  const formattedSelectedDate = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={styles.container}>
      <div className={styles.quizHero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <h1>Centre de connaissances</h1>
            <div className={styles.streakIndicator}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span>Série : 12 jours</span>
            </div>
          </div>
          <p>Validez une unité d'apprentissage quotidienne pour maintenir votre progression.</p>
        </div>
      </div>

      <div className={styles.quizMainGrid}>
        <div className={styles.calendarCard}>
          <div className={styles.calendarHeader}>
            <div className={styles.monthSelector}>
              <button onClick={() => changeMonth(-1)} className={styles.navBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <h2 className={styles.monthTitle}>{monthName}</h2>
              <button onClick={() => changeMonth(1)} className={styles.navBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            <div className={styles.legend}>
              <div className={styles.legendItem}><span className={styles.dotDone}></span> Terminé</div>
              <div className={styles.legendItem}><span className={styles.dotToday}></span> Disponible</div>
            </div>
          </div>

          <div className={styles.calendarGrid}>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
              <div key={d} className={styles.weekDay}>{d}</div>
            ))}

            {calendarData.map((day, i) => {
              const isSelected = day.num !== null &&
                                 selectedDate.getDate() === day.num &&
                                 selectedDate.getMonth() === viewDate.getMonth();

              const isToday = day.status === 'today';

              let customStyle: any = {};

              if (isToday) {
                customStyle.backgroundColor = '#ecfdf5';
                customStyle.color = '#22c55e';
              } else if (isSelected) {
                customStyle.borderColor = '#22c55e';
                customStyle.color = '#22c55e';
                customStyle.borderWidth = '2px';
                customStyle.borderStyle = 'solid';
              }

              return (
                <div
                  key={i}
                  onClick={() => day.num && handleDayClick(day.num)}
                  className={`
                    ${styles.dayBox}
                    ${day.num ? styles[day.status] : styles.empty}
                    ${isSelected ? styles.selected : ''}
                  `}
                  style={customStyle}
                >
                  {day.num && <span className={styles.dayNumber}>{day.num}</span>}

                  {day.status === 'done' && (
                    <svg className={styles.statusIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  )}

                  {day.status === 'locked' && (
                    <svg className={styles.statusIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className={styles.detailPanel}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #eaeaea', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'capitalize', color: '#111827' }}>
            {formattedSelectedDate}
          </div>

          {isLoading ? (
            <div className={styles.detailHeader}>
              <span className={styles.detailLabel}>Chargement...</span>
            </div>
          ) : dailyQuiz?.quizz ? (
            <>
              <div className={styles.detailHeader}>
                <span className={styles.detailLabel}>Difficulté du quizz</span>
                <span className={styles.difficultyTag} data-difficulty={dailyQuiz.quizz.difficulty?.name?.toLowerCase() || 'facile'}>
                  {dailyQuiz.quizz.difficulty?.name || 'Facile'}
                </span>
              </div>
              <h3 className={styles.questionTitle}>{dailyQuiz.quizz.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
                {dailyQuiz.quizz.description}
              </p>
              <div className={styles.statsList}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Récompense Max.</span>
                  <span className={styles.statValue}>{dailyQuiz.quizz.xp_reward} XP</span>
                </div>
              </div>
              <button
                  className={styles.startBtn}
                  onClick={() => router.push(`/quizz/${dailyQuiz.id}`)}
                >
                 {isSelectedDateToday() ? "Démarrer l'évaluation" : "Consulter le module"}
              </button>
            </>
          ) : diffDays > 0 ? (
            <>
              <div className={styles.detailHeader}>
                <span className={styles.detailLabel} style={{ color: '#9ca3af' }}>Contenu verrouillé</span>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 1rem', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px dashed #e5e7eb' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <p style={{ fontSize: '0.95rem', color: '#4b5563', margin: 0, lineHeight: '1.5' }}>
                  Patience, ce module sera accessible dans<br/>
                  <strong style={{ color: '#111827', fontSize: '1.1rem', display: 'inline-block', marginTop: '0.5rem' }}>{diffDays} jour{diffDays > 1 ? 's' : ''}</strong>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.detailHeader}>
                <span className={styles.detailLabel}>Non disponible</span>
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.5' }}>
                Aucun module n'est disponible pour cette date.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}