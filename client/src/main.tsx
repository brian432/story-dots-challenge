import * as ReactDOM from 'react-dom/client'
import React from 'react'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from './context/LoggedState'
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <Provider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
)
