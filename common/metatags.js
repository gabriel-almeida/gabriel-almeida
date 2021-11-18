export default {
  metatags(meta) {
    let { title, description, author } = meta || {}

    title = title || 'Gabriel Almeida | Blog'
    author = author || 'Gabriel Almeida'
    description = description || 'Discutindo tecnologia em profundidade'

    const result = {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'author',
          name: 'author',
          content: author,
        },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ],
    }

    if (meta && meta.tags) {
      result.meta.push({
        hid: 'keywords',
        property: 'keywords',
        content: meta.tags.join(', '),
      })
      const ogTags = meta.tags.map((tag, idx) => ({
        hid: `article:tag-${idx}`,
        property: 'article:tag',
        content: tag,
      }))
      result.meta.push(...ogTags)
    }

    if (meta && meta.canonical) {
      result.meta.push({
        hid: 'canonical',
        property: 'canonical',
        content: meta.canonical,
      })
    }

    if (meta && meta.published) {
      result.meta.push({
        hid: 'article:published_time',
        property: 'article:published_time',
        content: meta.published,
      })
    }

    if (meta && meta.modified) {
      result.meta.push({
        hid: 'article:modified_time',
        property: 'article:modified_time',
        content: meta.modified,
      })
    }

    if (meta && meta.image) {
      result.meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: meta.image,
      })
      result.meta.push({
        hid: 'twitter:image:src',
        property: 'twitter:image:src',
        content: meta.image,
      })
    }
    return result
  },
  blogPosting(meta) {
    const result = this.metatags(meta)
    const {
      title,
      description,
      author,
      canonical,
      published,
      image = null,
      modified = null,
      tags = [],
    } = meta || {}

    const jsonLd = {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      url: canonical,
      name: title,
      headline: title,
      description,
      image,
      datePublished: published,
      dateCreated: published,
      author: {
        '@type': 'Person',
        name: author,
        url: 'https://gabrielalmeida.dev',
      },
      keywords: tags,
    }

    if (modified) {
      jsonLd.dateModified = modified
    }

    result.script = [{ type: 'application/ld+json', json: jsonLd }]
    return result
  },
}
