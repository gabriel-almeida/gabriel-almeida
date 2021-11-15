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

    // result.script = [
    //   {
    //     type: 'application/ld+json',
    //     '@context': 'http://schema.org',
    //     '@type': 'Recipe',
    //     // More structured data...
    //   },
    // ]
    return result
  },
}
