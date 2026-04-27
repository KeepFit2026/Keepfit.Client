'use client'
import { useState } from 'react'
import styles from './navGroup.module.css'

interface NavGroupProps {
  groupLabel: string
  children: React.ReactNode
  defaultOpen?: boolean
}

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