import { POST } from './route'
import { NextResponse } from 'next/server'

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'Generated study notes' } }]
        })
      }
    }
  }))
}))

describe('POST /api/process-lecture', () => {
  it('returns 400 when no file is provided', async () => {
    const mockFormData = {
      get: jest.fn().mockReturnValue(null)
    }
    const mockRequest = {
      formData: jest.fn().mockResolvedValue(mockFormData)
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('No file provided')
  })

  it('successfully processes a lecture file', async () => {
    const mockFile = {
      text: jest.fn().mockResolvedValue('Sample lecture content')
    }
    const mockFormData = {
      get: jest.fn().mockReturnValue(mockFile)
    }
    const mockRequest = {
      formData: jest.fn().mockResolvedValue(mockFormData)
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.notes).toBe('Generated study notes')
  })

  it('handles processing errors', async () => {
    const mockFile = {
      text: jest.fn().mockRejectedValue(new Error('Processing failed'))
    }
    const mockFormData = {
      get: jest.fn().mockReturnValue(mockFile)
    }
    const mockRequest = {
      formData: jest.fn().mockResolvedValue(mockFormData)
    }

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to process lecture')
  })
}) 