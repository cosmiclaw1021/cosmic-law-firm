import enTranslation from '@/../src/i18n/en.json';
import koTranslation from '@/../src/i18n/ko.json';

const resources: Record<string, any> = {
  en: enTranslation,
  ko: koTranslation,
};

export function getServerTranslation(lng: string) {
  const resource = resources[lng] || resources.en;

  return (key: string, options?: { returnObjects?: boolean; defaultValue?: any }) => {
    const keys = key.split('.');
    let result = resource;

    for (const k of keys) {
      result = result?.[k];
    }

    if (result === undefined) {
      return options?.defaultValue !== undefined ? options.defaultValue : key;
    }

    return result;
  };
}
