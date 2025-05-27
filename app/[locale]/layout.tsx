import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import en from '../../locales/en.json'
import de from '../../locales/de.json'
import { LocaleProvider } from '@/components/LocaleProvider'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import DelayedRender from '@/components/common/DelayedRender'

const allLocales = { en, de }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  const messages = allLocales[locale as 'en' | 'de']
  if (!messages) return notFound()

  return (
    <LocaleProvider value={messages}>
      <Header />
      <DelayedRender>
        <main className="flex-grow">{children}</main>
        <Footer />
      </DelayedRender>
    </LocaleProvider>
  )
}
