
'use client'

import { useState, useEffect } from 'react'
import { 
  Identity, 
  Name, 
  Avatar 
} from '@coinbase/onchainkit/identity'
import { 
  usePrimaryButton, 
  useMiniKit, 
  useNotification 
} from '@coinbase/onchainkit/minikit'

interface Fan {
  fid: number
  username: string
  displayName: string
  avatar: string
  engagementScore: number
}

export function FanList() {
  const [fans, setFans] = useState<Fan[]>([])
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null)
  
  const { context } = useMiniKit()
  const sendNotification = useNotification()

  // Simulated fan data (replace with actual Farcaster API call)
  useEffect(() => {
    const mockFans: Fan[] = [
      {
        fid: 1,
        username: 'creator_fan1',
        displayName: 'Top Fan 1',
        avatar: 'https://i.imgur.com/dummyAvatar1.png',
        engagementScore: 95
      },
      {
        fid: 2,
        username: 'creator_fan2',
        displayName: 'Super Supporter',
        avatar: 'https://i.imgur.com/dummyAvatar2.png',
        engagementScore: 88
      }
    ]
    setFans(mockFans)
  }, [])

  usePrimaryButton(
    { 
      text: selectedFan 
        ? `Engage with ${selectedFan.displayName}` 
        : 'Select a Fan' 
    },
    () => {
      if (selectedFan) {
        sendNotification({
          title: 'Fan Engagement',
          body: `Reaching out to your top fan ${selectedFan.displayName}!`
        })
      }
    }
  )

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-farcaster-purple">
        Your Top Fans
      </h2>
      {fans.map(fan => (
        <div 
          key={fan.fid}
          onClick={() => setSelectedFan(fan)}
          className={`
            flex items-center p-3 rounded-lg cursor-pointer 
            ${selectedFan?.fid === fan.fid 
              ? 'bg-farcaster-purple text-white' 
              : 'bg-white hover:bg-gray-100'
            }
          `}
        >
          <Avatar 
            address={`0x${fan.fid.toString(16)}`} 
            src={fan.avatar} 
            className="w-12 h-12 mr-4" 
          />
          <div>
            <Name className="font-bold">{fan.displayName}</Name>
            <p className="text-sm">
              Engagement Score: {fan.engagementScore}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
  