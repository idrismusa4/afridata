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

## [Unreleased]
- Implemented JSON file handling in `agent/sourceHandler.ts` to extract content for metadata generation.
- Updated `agent/metadataGenerator.ts` to include 'JSON' as a supported `file_type`.
+ Implemented JSON file handling in `agent/sourceHandler.ts` to extract content for metadata generation.
+ Updated `agent/metadataGenerator.ts` to include 'JSON' as a supported `file_type`.
+ Updated `agent/metadataGenerator.ts` to initialize Gemini client within `generateMetadata` function for Next.js v15 compatibility.
+ Updated `agent/storage.ts` to initialize Supabase client within `saveDataset` function for Next.js v15 compatibility.
+ Created API route `app/api/search/route.ts` to receive search queries and trigger the agent workflow.
+ Added Webpack configuration to `next.config.mjs` to handle `pdf-parse` as an external dependency for the server build, resolving an `ENOENT` error.
+ Fixed `agent/metadataGenerator.ts` to properly handle markdown-formatted JSON responses from Gemini API by extracting JSON content from code blocks before parsing.
+ **Note:** The agent is now successfully generating and saving metadata to the database, but file uploads to Supabase Storage are failing with a 403 Unauthorized error due to Row Level Security (RLS) policies. To fix this, you need to update your Supabase RLS policies for the "datasets" storage bucket to allow uploads from your application. 
+ Updated the metadata generation prompt to include additional fields needed for the dataset detail page, such as description, author, author_type, size, license, columns, and rows. 
+ Created a database migration script (`migrations/update_datasets_table.sql`) to update the Supabase datasets table with all the fields needed for the dataset detail page, including indexes for commonly queried fields and example RLS policies for the datasets storage bucket. 
+ Created a script (`migrations/update_rls_policies.sql`) to update the RLS policies for the datasets storage bucket to allow file uploads and public access to read files. 
+ Fixed the file upload error in `agent/storage.ts` by adding the missing `getContentType` function to properly set the content type when uploading files to Supabase Storage. 
+ Removed file upload logic from `agent/storage.ts` to avoid potential copyright issues. Now the system only stores metadata and links to the original sources instead of storing the actual files.
+ Fixed the search API to properly handle JSON syntax for tags in Supabase queries.
+ Removed duplicate navigation bar and used the existing Navigation component.
+ Added sample data fallback to the search API to ensure results are displayed even when the database is empty.
+ Implemented sort functionality for search results (by relevance, downloads, recency, and rating).
+ Fixed the Select component error by ensuring all SelectItem components have non-empty string values.
+ Added automatic database initialization to insert sample data if the database is empty, ensuring users always see results.
+ Implemented the AI agent workflow that is triggered when a user searches, simulating the process of finding, processing, and classifying datasets.
+ Updated the search functionality to first trigger the agent workflow, then display results from the database.
+ Improved the search API to properly query the database and return real results from the agent workflow.
+ Fixed the search page to correctly handle the agent workflow and display search results.
+ Updated the agent workflow to return results directly to the user instead of querying the database.
+ Fixed the search page to use the agent API directly and display results from the agent response.
+ Updated the landing page to use the agent API directly.
+ Fixed the search page to properly handle state and prevent TypeError when accessing undefined properties.
+ Updated the search page to use setResults instead of setFilters for updating search results.
+ Fixed the search page to use local state for search results instead of relying on the useSearch hook.
+ Fixed the search API to properly call the agent API with the correct URL.
+ Implemented real agent workflow using SerpAPI for web search and Gemini for summarization.
+ Updated search API to check Supabase first, then call the agent if needed.
+ Fixed Gemini API model name and improved error handling for file downloads.
+ Added support for CSV and JSON file processing.
+ Updated metadata structure to match the dataset details page.
+ Improved search API to properly transform data for the dataset details page. 