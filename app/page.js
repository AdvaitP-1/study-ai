'use client'

import { useState } from 'react'
import LectureUploader from '../components/LectureUploader'
import Button from '../components/Button'

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [notes, setNotes] = useState(null)

  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      })
      const data = await response.json()
      
      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Error creating checkout session:', error)
    }
  }

  const handleUploadComplete = (data) => {
    setNotes(data.notes)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">StudyAI</h1>
            {!isSubscribed && (
              <Button onClick={handleSubscribe} variant="primary">
                Subscribe - $20/month
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSubscribed ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transform Your Lectures into Smart Study Notes
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Upload your lecture recordings and let AI create detailed, organized notes for you.
            </p>
            <Button onClick={handleSubscribe} variant="primary" className="text-lg">
              Get Started - $20/month
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <LectureUploader onUploadComplete={handleUploadComplete} />
            
            {notes && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Generated Notes</h3>
                <div className="prose max-w-none">
                  {notes.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
