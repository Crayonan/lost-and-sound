export interface ArtistCardProps {
  name: string
  image: string
  day: string
  time: string
  venue: string
  altTitle?: string
}

export default function ArtistCard({ name, image, day, time, venue, altTitle }: ArtistCardProps) {
  return (
    <a className="act" href="#">
      <figure className="act__image">
        <img src={image || "/placeholder.svg"} alt={name} loading="lazy" />
      </figure>

      <span className="act__content">
        <h4 className="title-6 act__content-title">{altTitle || name}</h4>

        <span className="act__content-days">{day.toLowerCase()}</span>

        <span className="act__content-meta">
          <span>{time}</span>
          <span className="act-performance__location">{venue}</span>
        </span>
      </span>
    </a>
  )
}
