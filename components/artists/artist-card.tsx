// src/components/artists/artist-card.tsx

export interface ArtistCardProps {
  name: string;
  image: string;
  day: string; // e.g., "friday", "TBA"
  time: string; // e.g., "20:00 - 21:00", "TBA"
  venue: string; // e.g., "Main Stage", "TBA"
  altTitle?: string;
  onClick?: () => void; // Added onClick prop
}

export default function ArtistCard({ name, image, day, time, venue, altTitle, onClick }: ArtistCardProps) {
  return (
    // Changed <a> to <div> and added onClick, cursor-pointer
    <div
      className="act cursor-pointer group" // Added group for potential hover effects on children
      onClick={onClick}
      role="button" // For accessibility
      tabIndex={0} // For keyboard accessibility
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }} // Keyboard activation
    >
      <figure className="act__image">
        <img src={image || "/placeholder.svg"} alt={altTitle || name} loading="lazy" />
      </figure>

      <span className="act__content">
        <h4 className="title-6 act__content-title">{altTitle || name}</h4>
        {/* Display day only if it's not TBA for cleaner look */}
        {day && day.toLowerCase() !== "tba" && (
            <span className="act__content-days">{day.toLowerCase()}</span>
        )}
        
        {/* Display meta only if not both are TBA */}
        {(time && time.toLowerCase() !== "tba") || (venue && venue.toLowerCase() !== "tba") ? (
            <span className="act__content-meta">
            {time && time.toLowerCase() !== "tba" && <span>{time}</span>}
            {/* Add a separator if both time and venue are present and not TBA */}
            {time && time.toLowerCase() !== "tba" && venue && venue.toLowerCase() !== "tba" && <span className="mx-1 hidden sm:inline">|</span>}
            {venue && venue.toLowerCase() !== "tba" && <span className="act-performance__location block sm:inline">{venue}</span>}
            </span>
        ) : null}
      </span>
    </div>
  );
}