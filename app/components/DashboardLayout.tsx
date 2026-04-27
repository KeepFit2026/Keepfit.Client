import { useUser } from '../providers/userProvider'
import { User } from '../types/User'
import { Aside } from './Aside'
import styles from './dashboardLayout.module.css'
import { XpCard } from './topbar/xp'

type DashboardLayoutProps = {
  sidebar: React.ReactNode
  user?: User
  sidebarFooter?: React.ReactNode
  pageTitle: string
  breadcrumb?: string
  topbarActions?: React.ReactNode
  children: React.ReactNode
}

type TopBarProps = {
  title: string,
  breadcrumb?: string;
  actions?: React.ReactNode;
  userData?: any;
}

function Topbar({ title, breadcrumb, actions, userData }: TopBarProps) {

  const xp = userData?.current_xp ?? 1240;
  const nextXp = userData?.xp_required;
  const level = userData?.current_level ?? 8;
  const progress = (xp / nextXp) * 100;

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <span className={styles.topbarTitle}>{title}</span>
        {breadcrumb && <span className={styles.topbarBreadcrumb}>{breadcrumb}</span>}
      </div>

      <div className={styles.topbarRight}>
        <XpCard
          xp={xp}
          nextXp={nextXp}
          level={level}
          progress={progress}
        />
        {actions && <div className={styles.topbarActions}>{actions}</div>}
      </div>
    </div>
  )
}

export function DashboardLayout({ sidebar, sidebarFooter, pageTitle, breadcrumb, topbarActions, children }: DashboardLayoutProps) {

  const { user } = useUser();

  return (
    <div className={styles.root}>
      <Aside user={user!} footer={sidebarFooter}>
        {sidebar}
      </Aside>

      <div className={styles.body}>
        <Topbar
          title={pageTitle}
          breadcrumb={breadcrumb}
          actions={topbarActions}
          userData={user}
        />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}