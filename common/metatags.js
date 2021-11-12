export default {
  metatags(meta) {
    let { title, description, author } = meta || {}

    title = title || 'Gabriel Almeida | Blog'
    author = author || 'Gabriel Almeida'
    description = description || 'Discutindo tecnologia em profundidade'

    return {
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
  },
}
