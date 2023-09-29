import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface HttpQueryProviderProps {
  children: React.ReactNode
}

export const HttpQueryProvider: React.FC<HttpQueryProviderProps> = ({
  children,
}) => {
  const client: QueryClient = useMemo(() => new QueryClient(), [])

  return <QueryClientProvider {...{ client, children }} />
}
