import 'server-only'

const dictionaries: any = {
  ar: () => import('../dictionaries/ar.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'ar' | 'en' | 'fr') => {
  // كنفحصو واش اللغة كاينة فعلاً في القاموس باش ما يوقعش الـ Crash
  if (typeof dictionaries[locale] === 'function') {
    return dictionaries[locale]();
  }
  // إيلا ما كانتش، كنعطيوه العربي كـ Default
  return dictionaries['ar']();
}