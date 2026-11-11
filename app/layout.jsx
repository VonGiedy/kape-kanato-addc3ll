import './globals.css'

export const metadata = {
  title: 'Kape Kanato | ADDC3LL Modern Coffee Research & Learning Studio',
  description: 'A modern interactive Coffee Education Studio for the Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory (ADDC3LL).',
  icons: {
    icon: '/addc3ll-logo.jpg',
    apple: '/addc3ll-logo.jpg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Montserrat:wght@700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-umber-dark text-cream font-sans antialiased selection:bg-caramel selection:text-espresso">
        {children}
      </body>
    </html>
  )
}
