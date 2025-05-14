import HeaderClient from "./HeaderClient";
import { getHeaderData } from "@/lib/payloadAPI";
import type { Header as HeaderType } from "@/types/payload-types";

export default async function HeaderWrapper() {
  const headerData: HeaderType | null = await getHeaderData();
  const navItems = headerData?.navItems ?? [];
  return <HeaderClient navItems={navItems.map(item => ({ ...item, id: item.id === null ? undefined : item.id }))} />;
}
