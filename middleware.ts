import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. كنفحصو واش الرابط ديجا فيه لغة (ar, en, fr)
  const pathnameIsMissingLocale = [ '/ar', '/en', '/fr' ].every(
    (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale
  )

  // 2. إيلا كان الرابط خاوي (يعني localhost:3000)، صيفطو لـ /ar
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/ar${pathname}`, request.url))
  }
}

export const config = {
  // هاد السطر هو المهم: كينقز الملفات التقنية باش ما يوقعش Loop
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}