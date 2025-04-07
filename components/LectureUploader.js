import { useState } from 'react'
import Button from './Button'

export default function LectureUploader({ onUploadComplete }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('lecture', file)

      const response = await fetch('/api/process-lecture', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process lecture')
      }

      const data = await response.json()
      onUploadComplete(data)
      setFile(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
        <input
          type="file"
          onChange={handleFileChange}
          accept="audio/*,video/*,.pdf,.txt"
          className="hidden"
          id="lecture-upload"
          data-testid="file-input"
        />
        <label
          htmlFor="lecture-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="text-4xl mb-2">📚</div>
          <p className="text-gray-600">
            {file ? file.name : 'Drop your lecture file here or click to browse'}
          </p>
        </label>
      </div>

      {error && (
        <div className="text-red-600 text-sm" data-testid="error-message">
          {error}
        </div>
      )}

      <Button
        onClick={handleUpload}
        variant={file ? 'primary' : 'secondary'}
        disabled={!file || loading}
      >
        {loading ? 'Processing...' : 'Generate Notes'}
      </Button>
    </div>
  )
} 