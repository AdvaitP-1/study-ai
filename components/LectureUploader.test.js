import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LectureUploader from './LectureUploader'

describe('LectureUploader Component', () => {
  const mockOnUploadComplete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders upload area with initial text', () => {
    render(<LectureUploader onUploadComplete={mockOnUploadComplete} />)
    expect(screen.getByText(/Drop your lecture file here or click to browse/)).toBeInTheDocument()
  })

  it('shows file name after file selection', () => {
    render(<LectureUploader onUploadComplete={mockOnUploadComplete} />)
    const file = new File(['test content'], 'test-lecture.pdf', { type: 'application/pdf' })
    const input = screen.getByTestId('file-input')
    
    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText('test-lecture.pdf')).toBeInTheDocument()
  })

  it('shows error when trying to upload without file', () => {
    render(<LectureUploader onUploadComplete={mockOnUploadComplete} />)
    const uploadButton = screen.getByText('Generate Notes')
    
    fireEvent.click(uploadButton)
    expect(screen.getByTestId('error-message')).toHaveTextContent('Please select a file first')
  })

  it('handles successful upload', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ notes: 'Generated notes content' }),
      })
    )

    render(<LectureUploader onUploadComplete={mockOnUploadComplete} />)
    const file = new File(['test content'], 'test-lecture.pdf', { type: 'application/pdf' })
    const input = screen.getByTestId('file-input')
    
    fireEvent.change(input, { target: { files: [file] } })
    const uploadButton = screen.getByText('Generate Notes')
    fireEvent.click(uploadButton)

    await waitFor(() => {
      expect(mockOnUploadComplete).toHaveBeenCalledWith({ notes: 'Generated notes content' })
    })
  })

  it('handles upload failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    )

    render(<LectureUploader onUploadComplete={mockOnUploadComplete} />)
    const file = new File(['test content'], 'test-lecture.pdf', { type: 'application/pdf' })
    const input = screen.getByTestId('file-input')
    
    fireEvent.change(input, { target: { files: [file] } })
    const uploadButton = screen.getByText('Generate Notes')
    fireEvent.click(uploadButton)

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to process lecture')
    })
  })
}) 