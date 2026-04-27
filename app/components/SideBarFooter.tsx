import styles from './aside.module.css'

type SideBarsProps = {
  icon: String,
  label: String,
  onClick? : () => void
}

export function SidebarFooterItem({ icon, label, onClick }: SideBarsProps) {
  return (
    <>
      <button className={styles.footerItem} onClick={onClick}>
        <span className={styles.footerIcon}>{icon}</span>
        <span className={styles.footerLabel}>{label}</span>
      </button>
    </>
  )
}