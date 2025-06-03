# Changelog

## 1.0.0

- Initial creation of the `agent` directory and `agent/scraper.ts` with a function to fetch and parse HTML.
+ Created `agent/search.ts` for integrating with search APIs.
+ Updated `agent/search.ts` to include a `SearchResult` type and adjust the return type of `searchForDatasets`.
+ Integrated SerpAPI into `agent/search.ts` for performing web searches and extracting results.
+ Updated `agent/search.ts` to perform targeted SerpAPI searches for specific file types (pdf, csv, zip, json).
+ Created `agent/sourceHandler.ts` for processing search results based on file type.
+ Created `agent/agent.ts` to orchestrate the main AI agent workflow.
+ Created `agent/metadataGenerator.ts` for AI-based metadata generation.
+ Updated `agent/sourceHandler.ts` to call `generateMetadata` after extracting content.
+ Created `agent/storage.ts` to handle saving dataset metadata and files to Supabase.
+ Updated `agent/agent.ts` to integrate `saveDataset` for storage.
+ Updated `agent/agent.ts` to pass file content from `handleSource` to `saveDataset`.
+ Implemented PDF handling (download and text extraction) in `agent/sourceHandler.ts`.
+ Implemented CSV handling (download and content inspection) in `agent/sourceHandler.ts`.
+ Implemented ZIP handling (download and content inspection) in `agent/sourceHandler.ts`.
+ Installed `@google/genai` package for Gemini API integration.
+ Integrated Gemini API into `agent/metadataGenerator.ts` for AI metadata generation.
+ Implemented Supabase storage logic in `agent/storage.ts` for saving metadata and files. 