
'use client'

import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'viem/chains'
import { type ReactNode } from 'react'

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'fan',
          name: 'Farcaster Fanfinder',
          logo: '/logo.png',
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  )
}
  