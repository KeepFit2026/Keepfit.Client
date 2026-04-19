'use client'
import { useState } from 'react'
import styles from './navGroup.module.css'

interface NavGroupProps {
  /** Section label shown above items */
  groupLabel: string
  /** NavLabel components */
  children: React.ReactNode
  /** Open by default? */
  defaultOpen?: boolean
}

/**
 * A collapsible group of NavLabel items.
 *
 * Usage inside <Aside>:
 *   <NavGroup groupLabel="Mon activité">
 *     <NavLabel label="Accueil" href="/dashboard" icon="🏠" />
 *     <NavLabel label="Exercices" href="/dashboard/exercices" icon="⚡" badge={3} />
 *   </NavGroup>
 */
export function NavGroup({
  groupLabel,
  children,
  defaultOpen = true,
}: NavGroupProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={styles.group}>
      <button
        className={styles.header}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.label}>{groupLabel}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>
          ›
        </span>
      </button>

      <div
        className={styles.items}
        style={{ maxHeight: open ? '600px' : '0px' }}
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  )
}