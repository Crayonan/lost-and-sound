// src/app/[locale]/lineup/page.tsx

import ArtistPage from "@/components/artists/artist-page"; // Adjust the import path if necessary

// Define the props for your page component.
// Next.js App Router automatically passes `params` for dynamic segments like [locale].
interface LineupRoutePageProps {
  params: {
    locale: string; // This comes from the [locale] part of your directory structure
  };
  // You might also get searchParams if your URL has query strings:
  // searchParams?: { [key: string]: string | string[] | undefined };
}

export default function LineupPage({ params }: LineupRoutePageProps) {
  // The 'locale' is available from params.locale if you need it for other purposes
  // on this page (e.g., fetching localized global content like headers/footers,
  // or passing to other components).
  // For example:
  // const currentLocale = params.locale;

  // The ArtistPage component now handles its own data fetching internally.
  // You don't need to pass an 'artists' prop anymore.
  // The ArtistPage component also has a default title ("LINE-UP").
  // If you want to override this default title, you can pass the 'title' prop.
  // For example:
  // return <ArtistPage title="Festival Line-Up 2024" />;

  // If the default title "LINE-UP" is fine, just render the component:
  return <ArtistPage />;
}

// Optional: Metadata for SEO
// You can define metadata for the page like this:
// import type { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: 'Line-Up - My Festival', // Customize your page title
//   description: 'Check out the amazing artists performing at our festival.',
// };