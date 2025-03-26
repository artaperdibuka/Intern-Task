import { useState, useEffect, useRef, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../graphql/queries";
import { Character } from "./types";
import "../character/CharacterList.css";
import { useLanguage } from "../../translations/LanguageContext";
import languages from "../../translations/languages";
import { PiEyesLight } from "react-icons/pi";
import { FaHeartbeat} from "react-icons/fa";
import { GiPortal, GiSkullCrossedBones } from "react-icons/gi";
import { GoQuestion } from "react-icons/go";




interface Props {
  isInfiniteScroll: boolean;
}
const CharacterList = ({ isInfiniteScroll }: Props) => {
  const [page, setPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "origin" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);



  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        name: searchQuery || undefined
      }
    },
  });

  const { state } = useLanguage();
  const lang = languages[state.language];


  const lastCharacterRef = useRef<HTMLDivElement | null>(null);


  const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      alive: lang.statusAlive || 'Alive',
      dead: lang.statusDead || 'Dead',
      unknown: lang.statusUnknown || 'Unknown'
    };
    return statusMap[status.toLowerCase()] || status;
  };

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);


  const filteredAndSortedCharacters = useMemo(() => {
    let result = [...allCharacters];

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(char =>
        char.name.toLowerCase().includes(query) ||
        char.species.toLowerCase().includes(query) ||
        char.origin.name.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(char =>
        char.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (speciesFilter !== "all") {
      result = result.filter(char =>
        char.species.toLowerCase() === speciesFilter.toLowerCase()
      );
    }

    if (sortBy !== null) {
      result.sort((a, b) => {
        const fieldA = sortBy === "name"
          ? a.name.toLowerCase()
          : a.origin.name.toLowerCase();
        const fieldB = sortBy === "name"
          ? b.name.toLowerCase()
          : b.origin.name.toLowerCase();

        if (fieldA < fieldB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [allCharacters, debouncedSearchQuery, statusFilter, speciesFilter, sortBy, sortDirection]);

  useEffect(() => {
    if (isFiltering) {
      setPage(1);
      setAllCharacters([]);
    }
  }, [searchQuery, statusFilter, speciesFilter]);

  useEffect(() => {
    if (data && data.characters.results) {
      setAllCharacters(prev => {
        if (page === 1) return data.characters.results;

        const newCharacters = data.characters.results.filter(
          (newChar: Character) => !prev.some(char => char.id === newChar.id)
        );
        return [...prev, ...newCharacters];
      });

      setHasMore(data.characters.info.next !== null);
    }
  }, [data, page]);


  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (loading || !hasMore || !isInfiniteScroll) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const lastElement = lastCharacterRef.current;
    if (lastElement) {
      observer.current.observe(lastElement);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, isInfiniteScroll, filteredAndSortedCharacters]);

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "status") {
      setStatusFilter(value);
    } else if (filterType === "species") {
      setSpeciesFilter(value);
    }
    setIsFiltering(true);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSortChange = (field: "name" | "origin") => {
    if (sortBy === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  if (error) return (
    <div className="error-container">
      <p className="error-message">{lang.error || "Error"}: {error.message}</p>
      <button onClick={() => window.location.reload()} className="retry-button">
        {lang.retry || "Try Again"}
      </button>
    </div>
  );

  return (
    <>

      <div className="character-list-container">

        {/* Search Input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <PiEyesLight className="search-icon" />
        </div>

        {/* Filters and Sorting */}
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="status-filter">{lang.filterStatus}:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="all">{lang.allStatuses || "All Statuses"}</option>
              <option value="alive">{lang.statusAlive || "Alive"}</option>
              <option value="dead">{lang.statusDead || "Dead"}</option>
              <option value="unknown">{lang.statusUnknown || "Unknown"}</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="species-filter">{lang.filterSpecies}:</label>
            <select
              id="species-filter"
              value={speciesFilter}
              onChange={(e) => handleFilterChange("species", e.target.value)}
            >
              <option value="all">{lang.allSpecies || "All Species"}</option>
              <option value="human"> {lang.speciesHuman || "Human"}</option>
              <option value="alien">{lang.speciesAlien || "Alien"}</option>

            </select>
          </div>

          <div className="sort-group">
            <button
              className={`sort-button ${sortBy === "name" ? "active" : ""}`}
              onClick={() => handleSortChange("name")}
            >
              {lang.sortByName}
              {sortBy === "name" && (
                <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </button>
            <button
              className={`sort-button ${sortBy === "origin" ? "active" : ""}`}
              onClick={() => handleSortChange("origin")}
            >
              {lang.sortByOrigin}
              {sortBy === "origin" && (
                <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
              )}
            </button>
          </div>
        </div>

        {/* Character List */}
        <div className="main-character-box">
          {filteredAndSortedCharacters.length === 0 && !loading ? (
            <p className="no-results">{lang.noResults || "No characters found"}</p>
          ) : (
            <div className="characters-grid">
              {filteredAndSortedCharacters.map((character, index) => {
                const isLastElement = index === filteredAndSortedCharacters.length - 1 && !loading;


                const statusIcon = {
                  alive: <FaHeartbeat className="status-icon" style={{ color: "#97ce4c", marginRight: "5px" }} />,
                  dead: <GiSkullCrossedBones className="status-icon" style={{ color: "#e74c3c", marginRight: "5px" }} />,
                  unknown: <GoQuestion className="status-icon" style={{ color: "#f39c12", marginRight: "5px" }} />
                }[character.status.toLowerCase()];

                return (
                  <div
                    key={`${character.id}-${index}`}
                    className="character-card"
                    ref={isLastElement ? lastCharacterRef : null}
                  >
                    <img src={character.image} alt={character.name} className="character-image" />
                    <h3 className="character-name">{character.name}</h3>
                    <div className="character-divider"></div>
                    <div className="character-info">
                      <span className={`info-value status-${character.status.toLowerCase()}`}>
                        {statusIcon}
                        {formatStatus(character.status)}
                      </span>
                      <span className="info-value">{character.species}</span>
                      <span className="info-value">{character.gender}</span>
                      <span className="info-value">{character.origin.name}</span>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="loading-indicator">
                  <div className="spinner"></div>
                  <p>{lang.loading || "Loading more characters..."}</p>
                </div>
              )}
            </div>

          )}
          {!isInfiniteScroll && (
            <div className="page-pagination">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className="pagination-btn prev"
              >
                <GiPortal className="alien-icon flip" />
                {lang.previous || 'Previous'}
              </button>
              <span className="page-indicator">
                {page}
              </span>
              <button
                onClick={() => setPage(prev => prev + 1)}
                disabled={!hasMore || loading}
                className="pagination-btn next"
              >
                {lang.next || 'Next'}
                <GiPortal className="alien-icon" />
              </button>
            </div>
          )}
        </div>

        {loading && page === 1 && (
          <div className="skeleton-loader">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="character-card-skeleton"></div>
            ))}
          </div>
        )}
        {!hasMore && !loading && (
          <p className="end-message">{lang.endOfResults || "You've reached the end"}</p>
        )}
      </div>
    </>
  );
};

export default CharacterList;