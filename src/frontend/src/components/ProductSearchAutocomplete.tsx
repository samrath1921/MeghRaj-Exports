import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { productSearchIndex, type ProductSearchEntry } from '../utils/productSearchIndex';
import { splitByMatch } from '../utils/highlightMatch';

interface ProductSearchAutocompleteProps {
  className?: string;
  maxResults?: number;
  placeholder?: string;
  onSelect?: () => void;
}

export default function ProductSearchAutocomplete({
  className = '',
  maxResults = 12,
  placeholder = 'Search products...',
  onSelect,
}: ProductSearchAutocompleteProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownMounted, setIsDropdownMounted] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return productSearchIndex
      .filter(
        (entry) =>
          entry.normalizedName.startsWith(normalizedQuery) ||
          entry.normalizedName.includes(normalizedQuery)
      )
      .slice(0, maxResults);
  }, [maxResults, normalizedQuery]);

  const isDropdownOpen = isFocused && normalizedQuery.length > 0;

  const handleSelect = useCallback(
    (entry: ProductSearchEntry) => {
      navigate({
        to: '/products/$categorySlug/$subcategorySlug',
        params: {
          categorySlug: entry.categorySlug,
          subcategorySlug: entry.subcategorySlug,
        },
        search: {
          product: entry.productSlug,
        },
      });
      setQuery('');
      setIsFocused(false);
      setHighlightedIndex(-1);
      onSelect?.();
    },
    [navigate, onSelect]
  );

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownMounted(true);
      const frame = window.requestAnimationFrame(() => {
        setIsDropdownVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    setIsDropdownVisible(false);
    const timeout = window.setTimeout(() => {
      setIsDropdownMounted(false);
    }, 160);

    return () => window.clearTimeout(timeout);
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsFocused(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isDropdownOpen || results.length === 0) {
      setHighlightedIndex(-1);
      return;
    }

    setHighlightedIndex((prev) => {
      if (prev < 0 || prev >= results.length) return 0;
      return prev;
    });
  }, [isDropdownOpen, results.length]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (results.length === 0) return;
      setHighlightedIndex((prev) => (prev + 1) % results.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (results.length === 0) return;
      setHighlightedIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (results.length === 0) return;

      const selectedIndex =
        highlightedIndex >= 0 && highlightedIndex < results.length ? highlightedIndex : 0;
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
      return;
    }

    if (event.key === 'Escape') {
      setIsFocused(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-sm ${className}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
        <input
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            setHighlightedIndex(-1);

            if (!value.trim()) {
              setIsFocused(false);
              return;
            }
            setIsFocused(true);
          }}
          onFocus={() => {
            if (normalizedQuery) setIsFocused(true);
          }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={placeholder}
          aria-label="Search products"
          aria-expanded={isDropdownOpen}
          aria-controls="product-search-listbox"
          aria-activedescendant={
            highlightedIndex >= 0 && results[highlightedIndex]
              ? `product-search-option-${highlightedIndex}`
              : undefined
          }
          className="h-14 w-full rounded-lg border border-white/20 bg-black/20 pl-11 pr-3 text-xl text-white placeholder:text-white/65 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {isDropdownMounted && (
        <div
          className={`absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-white/15 bg-slate-950/95 shadow-lg backdrop-blur-sm transition-all duration-150 ease-out ${
            isDropdownVisible
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-1 opacity-0'
          }`}
        >
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-white/80">No products found</div>
          ) : (
            <ul id="product-search-listbox" role="listbox" className="max-h-72 overflow-y-auto py-1">
              {results.map((entry, index) => (
                <li key={entry.id}>
                  <button
                    id={`product-search-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={index === highlightedIndex}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(entry)}
                    className={`w-full px-4 py-2.5 text-left transition-colors ${
                      index === highlightedIndex ? 'bg-primary/25' : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="truncate text-base font-medium text-white">
                      {splitByMatch(entry.name, normalizedQuery).map((segment, segmentIndex) => (
                        <span
                          key={`${entry.id}-${segmentIndex}`}
                          className={segment.isMatch ? 'font-semibold' : undefined}
                        >
                          {segment.text}
                        </span>
                      ))}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
