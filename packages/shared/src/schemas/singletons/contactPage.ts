import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contactpagina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      description: 'Wordt boven het formulier getoond.',
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Ontvanger e-mailadres',
      type: 'string',
      description:
        'Waar formulier-inzendingen heen worden gestuurd. Valt terug op CONTACT_TO_EMAIL env var.',
      validation: (rule) =>
        rule.email().error('Vul een geldig e-mailadres in (of laat leeg om env var te gebruiken).'),
    }),
    defineField({
      name: 'privacyNotice',
      title: 'Privacy-tekst',
      type: 'text',
      rows: 2,
      description: 'Korte AVG-melding onder het formulier.',
      initialValue:
        'We gebruiken je gegevens alleen om contact met je op te nemen. Zie ons privacybeleid.',
    }),
    defineField({
      name: 'successMessage',
      title: 'Succes-bericht',
      type: 'string',
      initialValue: 'Bedankt! We nemen zo snel mogelijk contact op.',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Foutmelding',
      type: 'string',
      initialValue: 'Er ging iets mis. Probeer het later opnieuw of mail ons direct.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contactpagina' }),
  },
});
