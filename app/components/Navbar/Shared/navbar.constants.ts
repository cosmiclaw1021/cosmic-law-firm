import { useTranslation } from 'react-i18next';
import { practiceAreas } from '@/lib/practice-areas';

export const useNavbarConstants = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language || 'en';

  const practiceAreaLinks = practiceAreas.map((area) => ({
    name: i18n.language?.startsWith('ko') 
      ? area.titleKo 
      : i18n.language?.startsWith('zh') 
        ? area.titleZh 
        : area.title,
    path: `/${lng}/services/${area.slug}`,
  }));

  const aboutLinks = [
    { name: t('nav.about'), path: `/${lng}/about` },
    { name: t('nav.team'), path: `/${lng}/about/team` },
    { name: t('nav.ourApproach'), path: `/${lng}/message` },
  ];

  return { practiceAreaLinks, aboutLinks, lng };
};
