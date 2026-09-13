import { Calendar, Film, Star } from "lucide-react"

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

const PosterFallback = ({ title }) => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center border border-[#FD9797]/20">
        <Film className="text-[#FD9797] mb-3" size={36} strokeWidth={1.5} />
        <span className="text-sm font-semibold text-[#F2F2F2] line-clamp-3 leading-tight">
            {title || 'No poster available'}
        </span>
    </div>
)

const MovieCard = ({ movie, index}) => {
    const posterSrc = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null

    const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : "_"
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "_"
  return (
   <div style={{ animationDelay: `${Math.min(index * 60, 600)}ms`}}
   className="fade-in group bg-[#2A0D18]/60 backdrop-blur-sm 
    rounded-2xl overflow-hidden
    border border-[#FD9797]/10 shadow-lg shadow-black/30
    transition-all duration-300 ease-out
    hover:border-[#FD9797]/40 hover:-translate-y-1
    hover:shadow-2xl hover:shadow-[#FD9797]/10"
   >
    <div className="relative aspect-2/3 overflow-hidden bg-black/40">
     {posterSrc ? (
        <img
        src={posterSrc}
        alt={movie.title || 'Movie poster'}
        loading="lazy"
        className="w-full h-full object-cover 
            transition-transform duration-500 ease-out 
            group-hover:scale-105"
            onError={(e) => {
                e.currentTarget.style.display = "none"
            }}
        />
     ) : (
        <PosterFallback title={movie.title} />
     )}

     <div className="absolute top-1.5 right-1.5 flex 
        items-center gap-1 bg-black/50
        backdrop-blur-sm px-1.5 py-0.5
        rounded-full border border-[#FD9797]/20">
            <Star size={18} className="text-xs font-bold text-amber-200 fill-amber-400" />
            <span className="text-xs font-bold text-amber-200">{rating}</span>
     </div>
    </div>

    <div className="p-4 space-y-1.5">
        <h2 className="text-base">{movie.title}</h2>

        <div className="flex items-center gap-2 text-xs text-[#121212]/70">
            <Calendar size={18} strokeWidth={2} />
            <span>{year}</span>
        </div>

        {movie.overview && (
            <p className="text-sm leading-relaxed text-[#121212] line-clamp-2 pt-1">{movie.overview}</p>
        )}
    </div>

   </div>
  )
}

export default MovieCard