'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const ContactForm: React.FC = () => {
    const { t } = useTranslation();
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="w-full space-y-6">
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('contactPage.form.labels.name')}</label>
                        <input type="text" className="w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('contactPage.form.labels.email')}</label>
                        <input type="email" className="w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary outline-none transition-all" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('contactPage.form.labels.message')}</label>
                    <textarea rows={4} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary outline-none transition-all resize-none" placeholder={t('contactPage.form.placeholders.message')}></textarea>
                </div>

                <div className="flex items-start gap-3 py-2 bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/10">
                    <input
                        type="checkbox"
                        id="contact-tos-accept"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="contact-tos-accept" className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">
                        {t('contactPage.form.tosAccept')}
                    </label>
                </div>

                <button
                    disabled={!accepted}
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `mailto:ask@cosmiclawfirm.com?subject=${encodeURIComponent(t('practiceArea.emailSubject', { title: 'Website' }))}`;
                    }}
                    className="w-full py-4 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-xl hover:bg-secondary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98]"
                >
                    {t('contactPage.form.submit')}
                </button>
            </form>
            <p className="text-[9px] text-center text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                Note: This form opens your default email client to ensure data privacy.
            </p>
        </div>
    );
};

export default ContactForm;
