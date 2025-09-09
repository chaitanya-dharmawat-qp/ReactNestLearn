// file path: src/providers/AppProviders.tsx
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react'
import {BrowserRouter} from 'react-router'

export const AppProviders: React.FC<React.PropsWithChildren> = ({children}) => {
  // Create a client using ref to avoid re-creating it on every render
  // const queryClientRef = React.useRef<QueryClient>(null)
  // if (!queryClientRef.current) {
  //   queryClientRef.current = new QueryClient({
  //     defaultOptions: {queries: {retry: false, refetchOnWindowFocus: false}},
  //   })
  // }

  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {retry: false, refetchOnWindowFocus: false},
          },
        })
      }
    >
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  )
}
