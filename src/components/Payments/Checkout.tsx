'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Icon from '@src/components/Icon';

const Checkout: React.FC = () => {
    const { t } = useTranslation();
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                    <h2 className="text-3xl font-black uppercase tracking-tight">{t('payments.checkout.title')}</h2>

                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{t('payments.checkout.serviceLabel')}</p>
                            <p className="font-bold text-lg">Retainer - Film Production Legal Counsel</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{t('payments.checkout.amountLabel')}</p>
                            <p className="text-3xl font-black text-primary">$5,000.00 <span className="text-sm font-medium text-slate-400">USD</span></p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-80 space-y-6">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{t('payments.checkout.termsTitle')}</h3>
                        <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            <li className="flex gap-2"><Icon name="check_circle" className="size-4 text-primary shrink-0" /> {t('payments.checkout.term1')}</li>
                            <li className="flex gap-2"><Icon name="check_circle" className="size-4 text-primary shrink-0" /> {t('payments.checkout.term2')}</li>
                            <li className="flex gap-2"><Icon name="check_circle" className="size-4 text-primary shrink-0" /> {t('payments.checkout.term3')}</li>
                        </ul>
                    </div>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="checkout-tos-accept"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="checkout-tos-accept" className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                            {t('payments.checkout.tosAccept')}
                        </label>
                    </div>

                    <button
                        disabled={!accepted}
                        className="w-full py-5 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl active:scale-[0.98]"
                    >
                        {t('payments.checkout.submit')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
