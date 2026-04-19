import { Aside } from './Aside'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  sidebar: React.ReactNode
  user?: {
    name: string
    subtitle: string
    initials: string
  }
  sidebarFooter?: React.ReactNode
  pageTitle: string
  breadcrumb?: string
  topbarActions?: React.ReactNode
  children: React.ReactNode
}

function Topbar({title,breadcrumb,actions,
}: {
  title: string
  breadcrumb?: string
  actions?: React.ReactNode
}) {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <span className={styles.topbarTitle}>{title}</span>
        {breadcrumb && <span className={styles.topbarBreadcrumb}>{breadcrumb}</span>}
      </div>
      {actions && <div className={styles.topbarActions}>{actions}</div>}
    </div>
  )
}

export function DashboardLayout({sidebar, user, sidebarFooter, pageTitle, breadcrumb, topbarActions, children}: DashboardLayoutProps) {
  return (
    <div className={styles.root}>
      <Aside user={user} footer={sidebarFooter}>
        {sidebar}
      </Aside>

      <div className={styles.body}>
        <Topbar
          title={pageTitle}
          breadcrumb={breadcrumb}
          actions={topbarActions}
        />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}