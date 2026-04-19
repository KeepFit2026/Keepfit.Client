import { Aside } from './Aside'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  /** Sidebar content — pass NavGroup + NavLabel */
  sidebar: React.ReactNode
  /** User info forwarded to Aside */
  user?: {
    name: string
    subtitle: string
    initials: string
  }
  /** Sidebar footer slot */
  sidebarFooter?: React.ReactNode
  /** Topbar title */
  pageTitle: string
  /** Topbar breadcrumb */
  breadcrumb?: string
  /** Topbar right-side actions */
  topbarActions?: React.ReactNode
  /** Page body */
  children: React.ReactNode
}

function Topbar({
  title,
  breadcrumb,
  actions,
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

/**
 * Root layout used by all authenticated pages.
 *
 * Usage in app/dashboard/layout.tsx:
 *
 *   export default function Layout({ children }: { children: ReactNode }) {
 *     return (
 *       <DashboardLayout
 *         pageTitle="Tableau de bord"
 *         breadcrumb="Terminale B · Semaine 12"
 *         user={{ name: 'Tom Lefèvre', subtitle: 'Terminale B · Élève', initials: 'TL' }}
 *         sidebar={
 *           <>
 *             <NavLabel label="Accueil" href="/dashboard" icon="🏠" />
 *
 *             <NavGroup groupLabel="Mon activité">
 *               <NavLabel label="Exercices du jour" href="/dashboard/exercices" icon="⚡" badge={3} />
 *               <NavLabel label="Mon programme"     href="/dashboard/programme" icon="📋" />
 *               <NavLabel label="Historique"        href="/dashboard/historique" icon="📈" />
 *             </NavGroup>
 *
 *             <NavGroup groupLabel="Classe & Groupe">
 *               <NavLabel label="Challenges"    href="/dashboard/challenges" icon="🏆" badge={1} badgeVariant="alert" />
 *               <NavLabel label="Quiz anatomie" href="/dashboard/quiz"       icon="❓" />
 *             </NavGroup>
 *           </>
 *         }
 *         sidebarFooter={
 *           <>
 *             <SidebarFooterItem icon="⚙" label="Paramètres" />
 *             <SidebarFooterItem icon="↩" label="Déconnexion" onClick={logout} />
 *           </>
 *         }
 *       >
 *         {children}
 *       </DashboardLayout>
 *     )
 *   }
 */
export function DashboardLayout({
  sidebar,
  user,
  sidebarFooter,
  pageTitle,
  breadcrumb,
  topbarActions,
  children,
}: DashboardLayoutProps) {
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