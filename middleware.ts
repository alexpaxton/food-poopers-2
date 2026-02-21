import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

import { authConfig } from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth

  if (!isLoggedIn) {
    if (req.nextUrl.pathname === '/') return NextResponse.next()
    if (req.nextUrl.pathname === '/api/user/alias/check')
      return NextResponse.next()
    // Return 401 for API calls, redirect for page routes
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: [
    // Protect all API routes except auth callbacks
    '/api/((?!auth).*)',
    // Protect all app routes except static assets and auth routes
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
