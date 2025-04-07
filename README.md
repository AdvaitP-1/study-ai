# StudyAI - AI-Powered Lecture Notes Generator

StudyAI is a web application that uses artificial intelligence to transform lecture recordings into detailed, organized study notes. Built with Next.js, OpenAI, and Stripe for subscription management.

## Features

- Upload lecture recordings (audio/video) or text files
- AI-powered note generation using OpenAI
- Subscription-based access ($20/month)
- Modern, responsive UI
- Secure payment processing with Stripe

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Stripe account and API keys

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/study-ai.git
cd study-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run the test suite:
```bash
npm test
```

## Deployment

The application is ready to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI](https://openai.com/) - AI processing
- [Stripe](https://stripe.com/) - Payment processing
- [Jest](https://jestjs.io/) - Testing

## License

This project is licensed under the MIT License - see the LICENSE file for details.
