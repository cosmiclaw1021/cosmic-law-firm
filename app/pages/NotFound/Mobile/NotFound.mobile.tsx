import React from 'react';
import Link from '@/components/ui/Link';
import { useTranslation } from 'react-i18next';
import SEO from '../../../components/SEO';
import Icon from '@src/components/Icon';

const NotFoundMobile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="non-hero-page-gap flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <SEO 
        title={t('notFound.title')}
        description={t('notFound.description')}
      />
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
        <Icon name="wrong_location" className="size-16 text-slate-400" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{t('notFound.title')}</h1>
      <p className="text-base text-slate-600 dark:text-slate-400 mb-8 max-w-xs">
        {t('notFound.description')}
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-bold transition-all shadow-md w-full focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
      >
        {t('notFound.cta')}
      </Link>
    </div>
  );
};

export default NotFoundMobile;
