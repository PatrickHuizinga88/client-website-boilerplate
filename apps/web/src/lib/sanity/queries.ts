import groq from 'groq';

const blocksProjection = groq`
  blocks[]{
    _type,
    _key,
    _type == "hero" => {
      eyebrow,
      title,
      subtitle,
      image{ ..., asset->, alt },
      cta{
        label,
        type,
        "href": select(
          type == "external" => external,
          type == "internal" && internal->_type == "page" => "/" + internal->slug.current,
          type == "internal" && internal->_type == "post" => "/blog/" + internal->slug.current,
          null
        )
      }
    },
    _type == "richText" => { content }
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
