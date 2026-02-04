import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ko'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // We only want to redirect for pages, not for assets or api
    if (
      pathname.includes('.') || // extension (e.g. .jpg, .png)
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/')
    ) {
      return;
    }

    // You can optionally use a library here to detect the user's preferred language
    // but for now we'll just use the defaultLocale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|public|.*\..*).*)',
    // Optional: only run on root (/) URL
    '/',
  ],
};
