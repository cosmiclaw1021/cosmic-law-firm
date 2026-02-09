'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const SignupFlow: React.FC = () => {
    const { t } = useTranslation();
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">{t('auth.signup.title')}</h2>
            <p className="text-sm text-slate-500 mb-8">{t('auth.signup.description')}</p>

            <form className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">{t('auth.signup.emailLabel')}</label>
                    <input type="email" className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="name@example.com" />
                </div>

                <div className="flex items-start gap-3 py-4">
                    <input
                        type="checkbox"
                        id="tos-accept"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="tos-accept" className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {t('auth.signup.tosAccept')}
                    </label>
                </div>

                <button
                    disabled={!accepted}
                    className="w-full py-4 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-[0.98]"
                >
                    {t('auth.signup.submit')}
                </button>
            </form>
        </div>
    );
};

export default SignupFlow;
