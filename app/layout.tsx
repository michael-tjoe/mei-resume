import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { Meie_Script, Sora } from 'next/font/google'
import SerwistProvider from '@/components/Pwa/SerwistProvider'
import { NavigationProvider } from '@/providers/NavigationProvider'
import { ViewportProvider } from '@/providers/ViewportProvider'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora-family',
  display: 'swap',
})

const meieScript = Meie_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script-family',
  display: 'swap',
})

const APP_NAME = 'Stefanny Kusuma'
const APP_DESCRIPTION =
  'Graphic designer and illustrator specializing in social media design.'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#faf3e7',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const { device } = userAgent({ headers: headersList })
  const initialIsDesktop = device.type !== 'mobile'

  return (
    <html
      lang="en"
      className={`${sora.variable} ${meieScript.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SerwistProvider>
          <ViewportProvider initialIsDesktop={initialIsDesktop}>
            <NavigationProvider>{children}</NavigationProvider>
          </ViewportProvider>
        </SerwistProvider>
      </body>
    </html>
  )
}
