'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would verify the session and update the user's subscription status
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Subscription Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for subscribing to StudyAI. You now have access to our AI-powered note generation service.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting you back to the dashboard in a few seconds...
        </p>
      </div>
    </div>
  )
} 