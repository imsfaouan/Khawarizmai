import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. تحديد اللغات المدعومة
  const locales = ['ar', 'en', 'fr']

  // 2. فحص واش المسار (Pathname) كيبدا بشي لغة من اللغات المدعومة
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 3. إيلا كان المسار ما فيهش اللغة، صيفطو لـ /ar (اللغة الافتراضية)
  // ملاحظة: الـ matcher اللي تحت غايحمي الملفات التقنية باش ما يوصلوش لهنا أصلاً
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/ar${pathname}`, request.url))
  }
}

export const config = {
  /*
   * matcher: كيهنينا من تطبيق الـ Middleware على الملفات اللي ما محتاجاش لغات
   */
  matcher: [
    // تجاهل المسارات التالية:
    // - api: طلبات السيرفر
    // - _next/static & _next/image: ملفات Next.js الداخلية والصور
    // - sitemap.xml & robots.txt & favicon.ico: ملفات محركات البحث
    // - الصور بجميع أنواعها (png, jpg, svg, webp, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
}