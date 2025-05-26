export const useProjects = (options?: { categorySlug?: string; limit?: number }) => {
  const { categorySlug, limit = 10 } = options || {}
  const hasCategory = !!categorySlug

  const query = `
    query GetProjects($first: Int${hasCategory ? `, $term: [String]` : ''}) {
      projects(
        first: $first
        ${hasCategory ? `where: {
          taxQuery: {
            taxArray: [
              {
                taxonomy: CATEGORY
                field: SLUG
                terms: $term
              }
            ]
          }
        }` : ''}
      ) {
        nodes {
          id
          title
          content
          slug
          menuOrder
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  `

  const config = useRuntimeConfig()

  const { data, pending, error } = useAsyncData(`projects-${categorySlug ?? 'all'}-${limit}`, async () => {
    const res = await $fetch(config.public.wordpressUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: {
          first: limit,
          ...(hasCategory && { term: [categorySlug] }),
        },
      }),
    })

    return res.data?.projects?.nodes || []
  })

  return { data, pending, error }
}
