'use client'

import { useUser } from '../../providers/userProvider'
import styles from './xp.module.css'

export function XpCard() {
    const { user } = useUser();

    const xp = user?.current_xp ?? 0;
    const nextXp = user?.xp_required || 1;
    const level = user?.current_level ?? 1;

    const progress = Math.min((xp / nextXp) * 100, 100);

    return (
        <div className={styles.xpCard}>
            <div className={styles.xpInfo}>
                <span className={styles.levelBadge}>Niv. {level}</span>
                <span className={styles.xpValues}>{xp} / {nextXp} XP</span>
            </div>
            <div className={styles.xpTrack}>
                <div className={styles.xpFill} style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
}