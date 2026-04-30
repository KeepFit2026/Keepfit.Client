'use client';

import { User } from '@/app/types/User';
import styles from './dashboard.module.css'
import { useUser } from '@/app/providers/userProvider';
import api from '@/app/lib/axios';

function HeroCard({ user }: { user: User | null }) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroDay}>
        <span className={styles.heroDayNum}>J3</span>
        <span className={styles.heroDayLabel}>Semaine</span>
      </div>
      <div className={styles.heroText}>
        <h2>Bon courage, {user?.name ?? 'Utilisateur'} ! 💪</h2>
        <p>Programme Mobilité Active — 3 exercices à faire aujourd'hui</p>
        <div className={styles.heroPills}>
          <span className={styles.heroPill}>🪑 Chaise</span>
          <span className={styles.heroPill}>⏱ 12 min</span>
          <span className={styles.heroPill}>🟢 Débutant</span>
        </div>
      </div>
      <button className={styles.heroCta}>Commencer →</button>
    </div>
  )
}

function TeacherBanner() {
  return (
    <div className={styles.banner}>
      <span className={styles.bannerIcon}>📢</span>
      <div>
        <p className={styles.bannerTitle}>Mme Martin a lancé un exercice — Étirements dorsaux</p>
        <span className={styles.bannerSub}>Il y a 2 minutes · Durée : 5 min · Niveau débutant</span>
      </div>
      <div className={styles.bannerActions}>
        <button className={styles.btnOutline}>Ignorer</button>
        <button className={styles.btnPrimary}>▶ Rejoindre</button>
      </div>
    </div>
  )
}

function StatCard({
  icon, iconBg, label, value, unit, trend, trendVariant = 'up',
}: {
  icon: string; iconBg: string; label: string; value: string; unit?: string; trend: string; trendVariant?: 'up' | 'neutral'
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ background: iconBg }}>{icon}</div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>
        {value}
        {unit && <span className={styles.statUnit}>{unit}</span>}
      </div>
      <span className={`${styles.statTrend} ${styles[trendVariant]}`}>{trend}</span>
    </div>
  )
}

function ExerciseItem({
  icon, iconBg, name, meta, duration, done,
}: {
  icon: string; iconBg: string; name: string; meta: string; duration: string; done: boolean
}) {
  return (
    <div className={`${styles.exItem} ${done ? styles.exDone : ''}`}>
      <div className={styles.exDot} style={{ background: iconBg }}>{icon}</div>
      <div className={styles.exInfo}>
        <div className={styles.exName}>{name}</div>
        <div className={styles.exMeta}>{meta}</div>
      </div>
      <div className={styles.exDuration}>{duration}</div>
      <div className={`${styles.exCheck} ${done ? styles.exCheckDone : styles.exCheckTodo}`}>
        {done ? '✓' : ''}
      </div>
    </div>
  )
}

function ChallengeRow({
  rank, rankVariant, initials, avatarStyle, name, isMe, pts, pct,
}: {
  rank: number; rankVariant: 'gold' | 'silver' | 'bronze' | 'default'; initials: string; avatarStyle: React.CSSProperties; name: string; isMe?: boolean; pts: string; pct: number
}) {
  return (
    <div className={`${styles.challengeRow} ${isMe ? styles.challengeRowMe : ''}`}>
      <span className={`${styles.challengeRank} ${styles[rankVariant]}`}>{rank}</span>
      <div className={styles.challengeAvatar} style={avatarStyle}>{initials}</div>
      <div className={styles.challengeInfo}>
        <span className={styles.challengeName}>
          {name}
          {isMe && <span className={styles.youTag}>MOI</span>}
        </span>
        <div className={styles.miniBar}>
          <div className={styles.miniBarFill} style={{ width: `${pct}%` }} />
        </div>
      </div>
      <span className={styles.challengePts}>{pts}</span>
    </div>
  )
}

export default function DashboardPage() {
  const { user, isLoading, refetchUser } = useUser(); // Hook dans le provider.
  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Chargement de ton espace...
      </div>
    );
  }

  const handleAddXp = async () => {
    api.post('/api/addXp', {
      nbXp: 15 // <-- Valeur à attribuer selon l'action.
    });
    await refetchUser();
  }

  return (
    <>
      <TeacherBanner />
      <HeroCard user={user} />
      <button onClick={handleAddXp}> +15XP</button>

      <div className={styles.statsGrid}>
        <StatCard icon="🔥" iconBg="#d4f0e0" label="Streak actuel"     value="7"     unit=" jours"   trend="↑ Record personnel !" trendVariant="up" />
        <StatCard icon="⚡" iconBg="#e6f1fb" label="Exercices validés" value="24"    unit=" ce mois" trend="↑ +6 vs mois dernier"  trendVariant="up" />
        <StatCard icon="⭐" iconBg="#faeeda" label="Points KeepFit"    value="1 240"                 trend="🏅 Rang 4 dans la classe" trendVariant="neutral" />
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>📋 Exercices du jour</span>
            <button className={styles.cardLink}>Voir tout</button>
          </div>

          <div className={styles.calStrip}>
            {[
              { day: 'Lun', num: 24, dot: true },
              { day: 'Mar', num: 25, dot: true },
              { day: 'Mer', num: 26, dot: true },
              { day: 'Jeu', num: 27, dot: true, today: true },
              { day: 'Ven', num: 28 },
              { day: 'Sam', num: 29 },
              { day: 'Dim', num: 30 },
            ].map((d) => (
              <div key={d.day} className={`${styles.calDay} ${d.today ? styles.calToday : ''} ${d.dot && !d.today ? styles.calHasEx : ''}`}>
                <span className={styles.calDayName}>{d.day}</span>
                <span className={styles.calDayNum}>{d.num}</span>
                {d.dot && <span className={styles.calDot} />}
              </div>
            ))}
          </div>

          <div className={styles.exList}>
            <ExerciseItem icon="🧘" iconBg="#d4f0e0" name="Étirements du cou"      meta="Souplesse · Cervicales" duration="3 min" done />
            <ExerciseItem icon="💨" iconBg="#e6f1fb" name="Respiration abdominale" meta="Bien-être · Détente"     duration="4 min" done />
            <ExerciseItem icon="🪑" iconBg="#faeeda" name="Squats sur chaise"      meta="Muscu · Quadriceps"      duration="5 min" done={false} />
          </div>

          <div className={styles.progBarWrap}>
            <div className={styles.progBarLabel}>
              <span>Progression du jour</span>
              <span>2 / 3</span>
            </div>
            <div className={styles.progBarTrack}>
              <div className={styles.progBarFill} style={{ width: '66%' }} />
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>🏆 Challenge Terminale B</span>
              <button className={styles.cardLink}>Classement complet</button>
            </div>
            <div className={styles.challengeList}>
              <ChallengeRow rank={1} rankVariant="gold"   initials="SA" avatarStyle={{ background: '#faeeda', color: '#a0522d' }} name="Sara A."    pts="1 480 pts" pct={100} />
              <ChallengeRow rank={2} rankVariant="silver" initials="MB" avatarStyle={{ background: '#e6f1fb', color: '#185fa5' }} name="Mathieu B." pts="1 310 pts" pct={85}  />
              <ChallengeRow rank={4} rankVariant="bronze" initials="TL" avatarStyle={{ background: '#d4f0e0', color: '#166b3c' }} name="Tom L."     pts="1 240 pts" pct={70} isMe />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle} style={{ marginBottom: 12 }}>Actions rapides</div>
            <div className={styles.qaGrid}>
              {[
                { icon: '💪', label: 'Choisir un programme' },
                { icon: '🎯', label: 'Mon niveau'           },
                { icon: '❓', label: 'Quiz du jour'         },
                { icon: '📊', label: 'Mes stats'            },
              ].map((qa) => (
                <button key={qa.label} className={styles.qaItem}>
                  <span className={styles.qaIcon}>{qa.icon}</span>
                  <span className={styles.qaLabel}>{qa.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}