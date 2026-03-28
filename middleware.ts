import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['ar', 'fr', 'en'];
let defaultLocale = 'ar';

function getLocale(request: NextRequest) {
  // 1. كيهز اللغات اللي كيقبلهم المتصفح ديال الزائر
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();

  // 2. كيدير "Match" بين لغات السيت ولغات الزائر
  try {
    return match(languages, locales, defaultLocale);
  } catch (e) {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // استثناء الملفات (هنا حل مشكل البحث اللي هضرنا عليه)
  if (
    pathname.startsWith('/search-index.json') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // كاع الملفات اللي فيهم نقطة (png, jpg, json...)
  ) {
    return;
  }

  // واش المسار فيه ديجا لغة؟
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // إيلا مافيهش لغة، كيشوف لغة الزائر ويصيفطو ليها
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};