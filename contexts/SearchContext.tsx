"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Dataset {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  source_url: string;
  file_url: string;
  file_type: string;
  country: string;
  ai_score: number;
  created_at: string;
  author?: string;
  author_type?: string;
  size?: string;
  downloads?: number;
  views?: number;
  last_updated?: string;
  is_paid?: boolean;
  price?: string;
  rating?: number;
  reviews?: number;
  license?: string;
  columns?: number;
  rows?: number;
  files?: { name: string; size: string }[];
}

interface SearchFilters {
  fileType: string[];
  country: string;
  tags: string[];
  isPaid: boolean | null;
}

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  results: Dataset[];
  setResults: (results: Dataset[]) => void;
  isLoading: boolean;
  search: (query: string, filters?: SearchFilters) => Promise<void>;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
};

const defaultFilters: SearchFilters = {
  fileType: [],
  country: 'all',
  tags: [],
  isPaid: null,
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    fileType: [],
    country: 'all',
    tags: [],
    isPaid: null
  });

  const search = async (searchQuery: string, searchFilters?: SearchFilters) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          filters: searchFilters || filters,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Search API error:', errorData);
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error searching datasets:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerAgent = async (searchQuery: string) => {
    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to trigger agent');
      }

      // The agent runs in the background, so we don't need to wait for results
      console.log('Agent triggered successfully');
    } catch (error) {
      console.error('Error triggering agent:', error);
    }
  };

  return (
    <SearchContext.Provider value={{ 
      query, 
      setQuery, 
      results, 
      setResults,
      isLoading, 
      search, 
      filters, 
      setFilters 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 