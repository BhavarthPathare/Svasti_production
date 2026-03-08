import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  locale: locale || 'en',
  messages: {
    nav: {
      home: 'Home',
      about: 'About',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    hero: {
      title: 'Viya Films',
      subtitle: 'Cinematic Photography & Videography',
    },
  },
}));

