import ArtistPage from '@/components/artists/artist-page'

interface LineupRoutePageProps {
  params: {
    locale: string
  }
}

export default function LineupPage({ params }: LineupRoutePageProps) {
  return <ArtistPage />
}
