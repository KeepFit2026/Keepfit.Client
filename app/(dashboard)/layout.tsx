'use client'

import type { ReactNode } from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { NavLabel } from '../components/NavLabel'
import { NavGroup } from '../components/NavGroup'
import { SidebarFooterItem } from '../components/SideBarFooter'
import { useRouter } from 'next/navigation'
import { UserProvider } from '../providers/userProvider'

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
            credentials: 'include',
        });

        const xsrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(xsrfToken || ''),
            },
        });

        router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);

    } catch (err) {
        console.error(err);
    } finally {
        document.cookie = 'keepfit-session=; Max-Age=0; path=/; domain=localhost'
        document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/; domain=localhost'
        window.location.href = process.env.NEXT_PUBLIC_LOGIN_URL!
    }
  }

  return (
    <UserProvider>
      <DashboardLayout
        pageTitle="Tableau de bord"
        breadcrumb="Terminale B · Semaine 12"
        user={{ name: 'Tom Lefèvre', subtitle: 'Terminale B · Élève', initials: 'TL' }}
        sidebar={
          <>
            <NavLabel label="Accueil" href="/dashboard" icon="🏠" />
            <NavGroup groupLabel="Mon activité">
              <NavLabel label="Exercices du jour" href="/dashboard/exercices" icon="⚡" badge={3} />
              <NavLabel label="Mon programme"     href="/dashboard/programme" icon="📋" />
              <NavLabel label="Historique"        href="/dashboard/historique" icon="📈" />
            </NavGroup>
            <NavGroup groupLabel="Classe & Groupe">
              <NavLabel label="Challenges"    href="/dashboard/challenges" icon="🏆" badge={1} badgeVariant="alert" />
              <NavLabel label="Quiz anatomie" href="/dashboard/quiz"       icon="❓" />
            </NavGroup>
          </>
        }
        sidebarFooter={
          <SidebarFooterItem icon='*' label='Deconnexion' onClick={handleLogout} />
        }
      >
        {children}
      </DashboardLayout>
    </UserProvider>
  )
}