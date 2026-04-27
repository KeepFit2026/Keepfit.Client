import { User } from '../types/User'
import styles from './aside.module.css'

interface AsideProps {
  children: React.ReactNode
  user: User
  footer?: React.ReactNode
}

export function Aside({ children, user, footer }: AsideProps) {
  return (
    <aside className={styles.aside}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoMark}>
          <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
            <path
              d="M12 3C7 3 4 7 4 12s3 9 8 9 8-4 8-9-3-9-8-9z"
              fill="rgba(255,255,255,0.2)"
            />
            <path
              d="M8 12l2.5 2.5L16 9"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className={styles.logoWord}>
          Keep<em>Fit</em>
        </span>
        <span className={styles.logoVersion}>v1.0</span>
      </div>

      {/* User pill */}
      {user && (
        <div className={styles.userWrap}>
          <div className={styles.userPill}>
            <div className={styles.avatar}>{ user.name[0] }</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
            </div>
            <span className={styles.userChevron}>▾</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={styles.nav} aria-label="Navigation principale">
        {children}
      </nav>

      {/* Footer */}
      {footer && <div className={styles.footer}>{footer}</div>}
    </aside>
  )
}