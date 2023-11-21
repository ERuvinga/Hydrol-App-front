import type { Metadata } from 'next'
import '../Style/globals.css'

export const metadata: Metadata = {
  title: 'Hydrol-App',
  description: 'App manage connect to Watermeter of appart in HouseShold',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
