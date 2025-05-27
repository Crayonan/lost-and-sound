import ArtistPage from '@/components/artists/ArtistPage'

interface LineupRoutePageProps {
  params: {
    locale: string
  }
}

export default function LineupPage({ params }: LineupRoutePageProps) {
  return <ArtistPage />
}
