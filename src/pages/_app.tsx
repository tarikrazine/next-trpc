import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import superjson from 'superjson'

import { AppRouter } from '../server/router/app.router'
import { url } from '../constants'
import { trpc } from '../utils/trpc'
import { UserContextProvider } from '../context/user.context'

function MyApp({ Component, pageProps }: AppProps) {

  const { data, isLoading, error } = trpc.useQuery(['users.me'])
  
  if (isLoading) {
    return <p>User charging...</p>
  }

  return (
    <>
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
      </UserContextProvider>
    </>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      })
    ]
    
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          }
        }
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx?.req.headers,
            'x-ssr': '1',
          }
        }

        return {}
      },
      links,
      transformer: superjson
    }
  },
  ssr: false,
})(MyApp)
