'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './navLabel.module.css'

type NavLabelProps = {
  label: string
  href: string
  icon?: string
  badge?: string | number
  badgeVariant?: 'default' | 'alert' | 'amber'
}

type NavBadge = {
  value: string | number
  variant?: 'default' | 'alert' | 'amber'
}

function NavBadge({ value, variant = 'default'}: NavBadge) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {value}
    </span>
  )
}

export function NavLabel({label, href, icon, badge, badgeVariant = 'default'}: NavLabelProps) {
  const pathname = usePathname()
  const isActive =
    pathname === href ||
    (href !== '/' && href !== '/dashboard' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={`${styles.item} ${isActive ? styles.active : ''}`}
    >
      {icon && (
        <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}>
          {icon}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {badge !== undefined && (
        <NavBadge value={badge} variant={badgeVariant} />
      )}
    </Link>
  )
}