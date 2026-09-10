import { useState } from "react"
import { Search as SearchIcon, X as ClearIcon } from "lucide-react"

const Search = () => {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon
            className="text-lime-300 transition-colors duration-200 group-focus-within:text-lime-100"
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
          <SearchIcon size={18} strokeWidth={2.5} />
        </button>
      </div>
    </form>
  )
}

export default Search