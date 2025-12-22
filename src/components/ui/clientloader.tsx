'use client'

import { useState } from 'react'
import LoadingScreen from './loader'

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  return loading ? (
    <LoadingScreen onFinish={() => setLoading(false)} />
  ) : (
    <>{children}</>
  )
}
