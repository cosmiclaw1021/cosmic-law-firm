import localFont from 'next/font/local';

export const geistSans = localFont({
  src: [
    {
      path: '../public/fonts/geist-latin.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-latin-ext.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const geistMono = localFont({
  src: [
    {
      path: '../public/fonts/geist-mono-latin.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-mono-latin-ext.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});
