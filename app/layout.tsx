import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cricket ExpertPro - The Ultimate Online Cricket Game',
  description: 'Play Cricket ExpertPro online! Time your shots perfectly, hit sixes, build combos and beat your high score. No download needed - play instantly in your browser.',
  keywords: 'cricket game, online cricket, cricket batting game, browser cricket game, cricket expert pro',
  openGraph: {
    title: 'Cricket ExpertPro - The Ultimate Online Cricket Game',
    description: 'Play Cricket ExpertPro online! Time your shots perfectly, hit sixes, build combos and beat your high score.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏏</text></svg>" />
      </head>
      <body style={{ fontFamily: "'Nunito', sans-serif", background: '#0a0a0a' }}>
        {children}
      </body>
    </html>
  )
}
