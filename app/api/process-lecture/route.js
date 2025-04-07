import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI(process.env.OPENAI_API_KEY)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('lecture')

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to text (this is a simplified version - you'll need to handle different file types)
    const text = await file.text()

    // Process with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates detailed, well-structured notes from lecture content. Focus on key concepts, definitions, and examples."
        },
        {
          role: "user",
          content: `Please create detailed study notes from this lecture content: ${text}`
        }
      ],
      temperature: 0.7,
    })

    const notes = completion.choices[0].message.content

    // In a real application, you'd want to store these notes in a database
    return NextResponse.json({ notes })
  } catch (error) {
    console.error('Error processing lecture:', error)
    return NextResponse.json(
      { error: 'Failed to process lecture' },
      { status: 500 }
    )
  }
} 