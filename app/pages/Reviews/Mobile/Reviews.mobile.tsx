import React from 'react';
import Link from '@/components/ui/Link';
import Modal from '@/components/ui/Modal';
import { useReviewsLogic } from '../Shared/reviews.hooks';
import { motion, MotionConfig } from 'framer-motion';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0 } },
  viewport: { once: true },
};

const ReviewsMobile: React.FC = () => {
  const { t, reviews, selectedReview, openReview, closeReview } = useReviewsLogic();

  return (
    <MotionConfig reducedMotion="always">
      <>
      <SectionWithStars className="hero-header-gap w-full bg-white dark:bg-slate-900 py-10 px-4 border-b border-slate-100 dark:border-slate-800 overflow-hidden" settings={{ density: 0.44 }}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
          className="relative z-10 max-w-[960px] mx-auto text-center flex flex-col gap-3"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 w-fit mx-auto">
            <Icon name="favorite" className="text-yellow-600 dark:text-yellow-500 size-4" />
            <span className="text-yellow-700 dark:text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
              {t('hero.badge', { ns: 'reviews' })}
            </span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight uppercase">
            {t('hero.title', { ns: 'reviews' })}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-relaxed max-w-xl mx-auto">
            {t('hero.description', { ns: 'reviews' })}
          </p>
        </motion.div>
      </SectionWithStars>

      <SectionWithStars className="w-full" settings={{ density: 0.5 }}>
        <div className="relative z-10 max-w-[960px] mx-auto px-4 py-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4"
          >
            {reviews.map((review) => (
              <motion.button
                key={review.id}
                type="button"
                variants={fadeInUp}
                onClick={() => openReview(review)}
                className="text-left w-full flex flex-col bg-white/70 dark:bg-slate-900/50 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 active:scale-[0.99] transition-transform shadow-sm"
              >
                <div className="flex items-center justify-between">
                    <div className="flex text-primary dark:text-primary-light">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="star" className="size-[18px]" />
                      ))}
                    </div>
                  {review.date && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</span>}
                </div>

                <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic line-clamp-4 font-medium">
                  "{review.text}"
                </p>

                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest truncate">
                      {review.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1 truncate">
                      {review.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-primary dark:text-primary-light font-black text-[10px] uppercase tracking-[0.15em] shadow-sm border border-slate-100 dark:border-slate-700">
                    {t('items.readMore', { ns: 'reviews' })}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </SectionWithStars>

      <Modal
        isOpen={!!selectedReview}
        onClose={closeReview}
        title={
          selectedReview ? (
            <div className="flex items-center justify-between w-full gap-4 pr-4">
              <div className="min-w-0">
                <h3 className="font-black text-slate-900 dark:text-white text-base uppercase tracking-widest leading-tight truncate">
                  {selectedReview.name}
                </h3>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  {selectedReview.location}
                </p>
              </div>
              <div className="flex gap-0.5 text-yellow-400 shrink-0" aria-label={`${selectedReview.rating} star rating`}>
                {[...Array(selectedReview.rating)].map((_, i) => (
                  <Icon key={i} name="star" className="size-[18px]" />
                ))}
              </div>
            </div>
          ) : (
            ''
          )
        }
      >
        {selectedReview && (
          <div className="space-y-6">
            {selectedReview.date && (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{selectedReview.date}</span>
            )}

            <p className="text-base text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed">
              "{selectedReview.text}"
            </p>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={closeReview}
                className="h-12 px-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                {t('common.close', { defaultValue: 'Close' })}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <SectionWithStars className="w-full px-4 pb-12" settings={{ density: 0.47 }}>
        <div className="relative z-10 max-w-[960px] mx-auto bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 text-center shadow-xl overflow-hidden border border-white/5">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          <div className="relative z-10 flex flex-col gap-5 items-center">
            <h2 className="text-white text-2xl font-black uppercase tracking-tight">{t('cta.title', { ns: 'reviews' })}</h2>
            <p className="text-slate-300 text-base font-medium">{t('cta.description', { ns: 'reviews' })}</p>
            <div className="flex flex-col gap-3 w-full">
              <Link to="/contact" className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary/80 transition-colors h-12 px-8 text-white text-base font-bold shadow-lg w-full uppercase tracking-widest">
                {t('cta.book', { ns: 'reviews' })}
              </Link>
              <Link to="/services" className="flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors h-12 px-8 text-white text-base font-bold w-full uppercase tracking-widest">
                {t('cta.call', { ns: 'reviews' })}
              </Link>
            </div>
          </div>
        </div>
      </SectionWithStars>
      </>
    </MotionConfig>
  );
};

export default ReviewsMobile;
