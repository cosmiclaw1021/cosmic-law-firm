import React from 'react';
import Link from '@/components/ui/Link';
import Modal from '@/components/ui/Modal';
import { useReviewsLogic } from '../Shared/reviews.hooks';
import { motion } from 'framer-motion';
import Icon from '@src/components/Icon';
import SectionWithStars from '@src/components/layout/SectionWithStars';

const fadeInUp = {
  initial: { opacity: 1, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  viewport: { once: true },
};

const ReviewsDesktop: React.FC = () => {
  const { t, reviews, selectedReview, openReview, closeReview } = useReviewsLogic();

  return (
    <>
      <SectionWithStars className="w-full bg-white dark:bg-slate-900 py-12 px-8 border-b border-slate-100 dark:border-slate-800 overflow-hidden" settings={{ density: 0.44 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-[1280px] mx-auto text-center flex flex-col gap-3"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 w-fit mx-auto">
            <Icon name="favorite" className="text-yellow-600 dark:text-yellow-500 size-4" />
            <span className="text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
              {t('hero.badge', { ns: 'reviews' })}
            </span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight uppercase">
            {t('hero.title', { ns: 'reviews' })}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            {t('hero.description', { ns: 'reviews' })}
          </p>
        </motion.div>
      </SectionWithStars>

      <SectionWithStars className="w-full" settings={{ density: 0.5 }}>
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 py-12">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-6"
          >
            {reviews.map((review) => {
              const isTruncated = review.text.length > 300 || review.text.includes('…') || review.text.includes('...');
              return (
                <motion.button
                  key={review.id}
                  type="button"
                  variants={fadeInUp}
                  onClick={() => openReview(review)}
                  className="text-left w-full flex flex-col bg-white/70 dark:bg-slate-900/70 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] group cursor-pointer h-full shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-primary dark:text-primary-light">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="star" className="size-5" />
                        ))}
                      </div>
                      {review.date && (
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</span>
                      )}
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic whitespace-pre-line line-clamp-6 mb-6 font-medium">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 text-primary dark:text-primary-light flex items-center justify-center font-bold text-xs shrink-0">
                          {review.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-primary-light transition-colors leading-tight">
                            {review.name}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                            {review.location}
                          </p>
                        </div>
                      </div>
                      {isTruncated && (
                        <div className="shrink-0">
                          <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-primary-light font-black text-[10px] uppercase tracking-[0.15em] shadow-sm border border-slate-100 dark:border-slate-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                            {t('items.readMore', { ns: 'reviews' })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
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
            <div className="flex items-center justify-between mb-2">
              {selectedReview.date && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{selectedReview.date}</span>
              )}
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed">
              &ldquo;{selectedReview.text}&rdquo;
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

      <SectionWithStars className="w-full px-8 py-8 mb-8" settings={{ density: 0.47 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[1280px] mx-auto bg-slate-900 dark:bg-slate-800 rounded-2xl p-12 text-center shadow-xl overflow-hidden border border-white/5"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          <div className="relative z-10 flex flex-col gap-6 items-center">
            <h2 className="text-white text-3xl font-black uppercase tracking-tight">{t('cta.title', { ns: 'reviews' })}</h2>
            <p className="text-slate-300 text-lg font-medium max-w-[600px]">{t('cta.description', { ns: 'reviews' })}</p>
            <div className="flex flex-row gap-4 mt-2 w-full max-w-md justify-center">
              <Link to="/contact" className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary/80 transition-all h-12 px-8 text-white text-base font-bold shadow-lg uppercase tracking-widest">
                {t('cta.book', { ns: 'reviews' })}
              </Link>
              <Link to="/services" className="flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors h-12 px-8 text-white text-base font-bold backdrop-blur-sm uppercase tracking-widest">
                {t('cta.call', { ns: 'reviews' })}
              </Link>
            </div>
          </div>
        </motion.div>
      </SectionWithStars>
    </>
  );
};

export default ReviewsDesktop;
