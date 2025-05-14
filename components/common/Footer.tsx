// components/Footer.tsx

import { Footer as FooterType } from "@/types/payload-types";
import { getFooterData } from "@/lib/payloadAPI";
import { FooterClientInteractions } from "./FooterClient";

export default async function Footer() {
  // Fetch footer content from Payload CMS
  const footerData: FooterType | null = await getFooterData();
  if (!footerData) return null;

  // Delegate rendering to client-side component
  return <FooterClientInteractions footerData={footerData} />;
}
