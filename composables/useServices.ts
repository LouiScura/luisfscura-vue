type Service = {
  id: string
  title: string
  content: string
  menuOrder: number
  services?: {
    icon: string
  }
}

export const useServices = (options?: { limit?: number }) => {
  const { limit = 8 } = options || {}

  const query = `
    query GetServices($first: Int) {
      services(first: $first) {
        nodes {
          id
          title
          content
          menuOrder
          services {
            icon
          }
        }
      }
    }
  `

  const config = useRuntimeConfig()

  const { data, pending, error } = useAsyncData<Service[]>(
    `services-${limit}`,
    async () => {
      const res = await $fetch(config.public.wordpressUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { first: limit },
        }),
      })
      return res.data?.services?.nodes || []
    }
  )

  return { data, pending, error }
}
