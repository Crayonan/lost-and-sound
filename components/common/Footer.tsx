import type { Footer as FooterType } from '@/types/payload-types'
import { getFooterData } from '@/lib/payloadAPI'
import { FooterClientInteractions } from './FooterClient'

export default async function Footer() {
  const footerData: FooterType | null = await getFooterData()
  if (!footerData) return null

  return <FooterClientInteractions footerData={footerData} />
}
