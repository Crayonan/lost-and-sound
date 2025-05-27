export interface ArtistCardProps {
  name: string
  image: string
  day: string
  time: string
  venue: string
  altTitle?: string
  onClick?: () => void
}

export default function ArtistCard({
  name,
  image,
  day,
  time,
  venue,
  altTitle,
  onClick,
}: ArtistCardProps) {
  return (
    <div
      className="act cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
    >
      <figure className="act__image">
        <img src={image || '/placeholder.svg'} alt={altTitle || name} loading="lazy" />
      </figure>

      <span className="act__content">
        <h4 className="title-6 act__content-title">{altTitle || name}</h4>
        {day && day.toLowerCase() !== 'tba' && (
          <span className="act__content-days">{day.toLowerCase()}</span>
        )}

        {(time && time.toLowerCase() !== 'tba') || (venue && venue.toLowerCase() !== 'tba') ? (
          <span className="act__content-meta">
            {time && time.toLowerCase() !== 'tba' && <span>{time}</span>}
            {time && time.toLowerCase() !== 'tba' && venue && venue.toLowerCase() !== 'tba' && (
              <span className="mx-1 hidden sm:inline">|</span>
            )}
            {venue && venue.toLowerCase() !== 'tba' && (
              <span className="act-performance__location block sm:inline">{venue}</span>
            )}
          </span>
        ) : null}
      </span>
    </div>
  )
}
