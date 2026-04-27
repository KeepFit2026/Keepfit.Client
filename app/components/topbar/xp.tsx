import styles from './xp.module.css';

type XpProps = {
    xp: number;
    nextXp: number;
    level: number;
    progress: number;
}

export function XpCard({ xp, nextXp, level, progress }: XpProps) {
    return (
        <>
            <div className={styles.xpCard}>
                <div className={styles.xpInfo}>
                    <span className={styles.levelBadge}>Niv. {level}</span>
                    <span className={styles.xpValues}>{xp} / {nextXp} XP</span>
                </div>
                <div className={styles.xpTrack}>
                    <div className={styles.xpFill} style={{ width: `${progress}%` }} />
                </div>
            </div>
        </>
    )
}