import type { StructureResolver } from 'sanity/structure';

const SINGLETON_TYPES = new Set(['siteSettings', 'homePage']);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site instellingen')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.documentTypeListItem('page').title("Pagina's"),
      S.documentTypeListItem('post').title('Blog-artikelen'),
      S.documentTypeListItem('author').title('Auteurs'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETON_TYPES.has(item.getId() ?? '') &&
          !['page', 'post', 'author'].includes(item.getId() ?? ''),
      ),
    ]);
