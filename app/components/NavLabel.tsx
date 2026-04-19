'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './navLabel.module.css'

interface NavLabelProps {
  /** Display name shown in the sidebar */
  label: string
  /** Next.js route this item links to */
  href: string
  /** Emoji or short icon string */
  icon?: string
  /** Optional badge count / text */
  badge?: string | number
  /** Badge color variant */
  badgeVariant?: 'default' | 'alert' | 'amber'
}

function NavBadge({
  value,
  variant = 'default',
}: {
  value: string | number
  variant?: 'default' | 'alert' | 'amber'
}) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {value}
    </span>
  )
}

/**
 * A single sidebar navigation item.
 *
 * Usage inside <Aside>:
 *   <NavLabel label="Accueil"           href="/dashboard"          icon="🏠" />
 *   <NavLabel label="Exercices du jour" href="/dashboard/exercices" icon="⚡" badge={3} />
 */
export function NavLabel({
  label,
  href,
  icon,
  badge,
  badgeVariant = 'default',
}: NavLabelProps) {
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