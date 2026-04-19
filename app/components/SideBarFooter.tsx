import styles from './aside.module.css'

export function SidebarFooterItem({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick?: () => void
}) {
  return (
    <>
      <button className={styles.footerItem} onClick={onClick}>
        <span className={styles.footerIcon}>{icon}</span>
        <span className={styles.footerLabel}>{label}</span>
      </button>
    </>
  )
}