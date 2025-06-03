import { getJson } from "serpapi";

// This file will handle integrations with search APIs like SerpAPI and Google Search API.

export interface SearchResult {
  title: string;
  url: string;
  snippet?: string; // Optional: search APIs often provide a short description
  // fileType?: string; // We might infer this later or get from API if available
}

export async function searchForDatasets(query: string): Promise<SearchResult[]> {
  console.log(`Searching for datasets with query: ${query}`);

  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    console.error("SerpAPI key not found in environment variables.");
    return [];
  }

  const fileTypes = ['pdf', 'csv', 'zip', 'json'];
  let allDatasetResults: SearchResult[] = [];

  for (const fileType of fileTypes) {
    const fileTypeQuery = `${query} filetype:${fileType}`;
    console.log(`Performing search for: ${fileTypeQuery}`);

    const params = {
      q: fileTypeQuery, // User's search query with file type filter
      engine: "google", // Use Google search engine via SerpAPI
      api_key: apiKey,
      // Add other parameters as needed
    };

    try {
      const results: any = await getJson(params);

      // Process and map the results to our SearchResult interface
      if (results["organic_results"]) {
        results["organic_results"].forEach((result: any) => {
          // Basic check if the URL looks like a file download link (redundant with filetype filter but good practice)
          const fileExtensions = ['.pdf', '.csv', '.zip', '.json'];
          const isFileLink = fileExtensions.some(ext => result.link.toLowerCase().endsWith(ext));

           // Since we are filtering by filetype in the query, we assume organic_results are relevant.
           // We might want to add more checks here later if needed.
          // if (isFileLink) { // This check is less necessary now with filetype query
            allDatasetResults.push({
              title: result.title,
              url: result.link,
              snippet: result.snippet,
            });
          // }
        });
      }

    } catch (error: any) {
      console.error(`Error during SerpAPI search for filetype ${fileType}: ${error.message}`);
      // Continue to the next file type even if one fails
    }
  }

  console.log(`Completed searches. Found a total of ${allDatasetResults.length} potential dataset results.`);
  return allDatasetResults;
} 