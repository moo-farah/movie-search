import { useState } from "react"
import { Search as SearchIcon, X as ClearIcon, Loader2, Film } from "lucide-react"
import MovieCard from "./MovieCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Reset the search back to an empty
  const handleClear = () => {
    setQuery("");
    setMovies([]);
    setError(null);
    setHasSearched(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    // API Key
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) {
      setError('Missing VITE_TMDB_API_KEY in .env file')
      setLoading(false);
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    // Build the correct TMDB search URL
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false`

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP: ${res.status}`)
      const data = await res.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.log('Failed to load movies', error.message);
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon
            className="text-[#FD9797]/60 transition-colors duration-200 group-focus-within:text-[#FD9797]"
            size={20}
            strokeWidth={2.25}
          />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          aria-label="Search for movies"
          className="w-full bg-[#51091D] backdrop-blur-sm text-white font-medium placeholder-[#F2F2F2]
            pl-12 pr-12 py-3.5 rounded-full text-base
            border-2 border-transparent
            outline-none
            transition-all duration-200 ease-out
            focus:bg-[#51091D] focus:border-[#51091D]/60 focus:shadow-lg focus:shadow-[#51091D]/40
            hover:bg-[#51091D]/90
            caret-[#FD9797]"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute inset-y-0 right-14 flex items-center pr-0
              text-[#F2F2F2]/80 hover:text-lime-100
              transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#51091D] focus-visible:ring-offset-2 focus-visible:ring-offset-lime-900 rounded-full"
          >
            <ClearIcon size={18} strokeWidth={2.5} />
          </button>
        )}

        <button
          type="submit"
          disabled={!query.trim()}
          aria-label="Search"
          className="absolute inset-y-0 right-1.5 top-1/2 -translate-y-1/2
            h-10 w-10 flex items-center justify-center
            rounded-full
            bg-[#FD9797] text-[#121212] font-semibold
            transition-all duration-200 ease-out
            hover:bg-[#51091D] hover:text-[#F2F2F2] hover:scale-105
            active:scale-95
            disabled:bg-[#FD9797] disabled:text-[#121212]/80 disabled:cursor-not-allowed disabled:hover:scale-100
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FD9797] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FD9797]
            shadow-md shadow-lime-900/30"
        >
          {loading ? (
            <SearchIcon size={18} strokeWidth={2.5} />
          ): (
            <SearchIcon size={18} strokeWidth={2.5} />
          )}
          
        </button>
      </div>
    </form>

    <div className="mt-12">
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-[#F2F2F2]/70">
          <Loader2 size={32} className="animate-spin text-[#FD9797]" />
          <p className="text-sm text-zinc-900">Searching movies...</p>
        </div>
      )}
      {!loading && error && (
        <div className="max-w-xl mx-auto text-center py-12 px-6 rounded-2xl bg-red-950/30 border border=red-500/30">
          <p className="text-red-300 font-semibold mb-1">Semething went wrong</p>
          <p className="text-red-300/80 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && hasSearched && movies.length === 0 &&(
        <div className="max-w-xl mx-auto text-center p-16">
          <Film className="mx-auto mb-4 text-[#FD9797]" size={48} strokeWidth={1.5} />
          <p className="text-lg font-semibold text-[#121212] mb-1">No movies found</p>
          <p className="text-sm text-[#121212]/50 mb-1">Try a different keyword, or check your spelling.</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
        <p className="text-sm text-[#121212]/60 mb-5 px-1">
        {movies.length} result{movies.length === 1 ? "" :
        "s"} for {" "}
        <span className="text-[#51091D] font-medium">
          &ldquo;{query}&rdquo;</span>
        </p>
        <div className="grid grid-col-2 sm:grid-cols-3 
        md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i}/>
          ))}
        </div>
        </>
      )}
    </div>
    </div>
     
  )
}

export default Search