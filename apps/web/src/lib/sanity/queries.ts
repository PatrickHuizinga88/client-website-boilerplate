import groq from 'groq';

// Resolved href voor link-objects (intern ↔ extern).
const linkProjection = `
  label,
  type,
  "href": select(
    type == "external" => external,
    type == "internal" && internal->_type == "page" => "/" + internal->slug.current,
    type == "internal" && internal->_type == "post" => "/blog/" + internal->slug.current,
    null
  )
`;

const blocksProjection = groq`
  blocks[]{
    _type,
    _key,
    _type == "hero" => {
      eyebrow,
      title,
      subtitle,
      image{ ..., asset->, alt },
      cta{ ${linkProjection} }
    },
    _type == "richText" => { content },
    _type == "contactBlock" => { heading, intro },
    _type == "cta" => {
      heading,
      body,
      buttons[]{ ${linkProjection} }
    },
    _type == "features" => {
      heading,
      intro,
      items[]{ icon, title, body }
    },
    _type == "testimonials" => {
      heading,
      items[]{
        quote,
        authorName,
        authorRole,
        avatar{ ..., asset->, alt }
      }
    },
    _type == "faq" => {
      heading,
      items[]{ question, answer }
    },
    _type == "textImage" => {
      title,
      body,
      image{ ..., asset->, alt },
      imagePosition,
      cta{ ${linkProjection} }
    },
    _type == "logoCloud" => {
      heading,
      logos[]{
        image{ ..., asset->, alt },
        url
      }
    },
    _type == "gallery" => {
      heading,
      columns,
      images[]{ ..., asset->, alt }
    }
  }
`;

const seoProjection = groq`
  seo{
    title,
    description,
    image{ ..., asset-> },
    noIndex
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    logo{ ..., asset-> },
    contact,
    social,
    defaultSeo{
      title,
      description,
      image{ ..., asset-> }
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    title,
    ${blocksProjection},
    ${seoProjection}
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    ${blocksProjection},
    ${seoProjection}
  }
`;

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`;

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage{ ..., asset->, alt },
    author->{ name, slug }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    coverImage{ ..., asset->, alt },
    body,
    author->{ name, slug, avatar{ ..., asset-> } },
    ${seoProjection}
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    title,
    intro,
    recipientEmail,
    privacyNotice,
    successMessage,
    errorMessage,
    ${seoProjection}
  }
`;

export const sitemapEntriesQuery = groq`
  {
    "pages": *[_type == "page" && defined(slug.current) && !(seo.noIndex == true)]{
      "slug": slug.current,
      _updatedAt
    },
    "posts": *[_type == "post" && defined(slug.current) && !(seo.noIndex == true)]{
      "slug": slug.current,
      _updatedAt
    },
    "homeUpdated": *[_type == "homePage"][0]._updatedAt,
    "contactUpdated": *[_type == "contactPage"][0]._updatedAt
  }
`;
