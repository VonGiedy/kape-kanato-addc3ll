import './globals.css'

export const metadata = {
  title: 'Kape Kanato | ADDC3LL Prototype',
  description: 'A proposed Coffee Education Website for the Ateneo de Davao Coffee and Cacao Collaborative Learning Laboratory',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}