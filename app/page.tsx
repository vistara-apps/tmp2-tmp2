
'use client'

import { useEffect } from 'react'
import { 
  useMiniKit, 
  useAddFrame, 
  useOpenUrl 
} from '@coinbase/onchainkit/minikit'
import { FanList } from './components/FanList'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'

export default function Home() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex justify-between p-4">
        <h1 className="text-3xl font-bold text-farcaster-purple">
          Fanfinder
        </h1>
        <div>
          <ConnectWallet />
        </div>
      </header>

      <section className="flex-grow">
        <FanList />
      </section>

      <footer className="p-4 flex justify-between items-center">
        {context && !context.client.added && (
          <button 
            onClick={handleAddFrame}
            className="bg-farcaster-purple text-white px-4 py-2 rounded"
          >
            Save Frame
          </button>
        )}
        <button 
          onClick={() => openUrl('https://warpcast.com')}
          className="text-farcaster-purple underline"
        >
          Visit Warpcast
        </button>
      </footer>
    </main>
  )
}
  