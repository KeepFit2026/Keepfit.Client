// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL!

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (pathname.startsWith('/dashboard')) {
        const session = request.cookies.get('keepfit-session')

        if (!session || session.value === '') {
            return NextResponse.redirect(loginUrl)
        }

        // Vérifie la session côté Laravel
        try {
            const cookieHeader = `keepfit-session=${session.value}`
            const check = await fetch('http://localhost:8000/api/user', {
                headers: {
                    'Cookie': cookieHeader,
                    'Accept': 'application/json',
                },
                cache: 'no-store',
            })

            const json = await check.json()

            if (!check.ok || json.message === 'Unauthenticated.') {
                return NextResponse.redirect(loginUrl)
            }

        } catch (e) {
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}