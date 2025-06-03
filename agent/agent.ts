// This file orchestrates the main AI agent workflow.

import { searchForDatasets, SearchResult } from "./search";
import { handleSource } from "./sourceHandler";
import { saveDataset } from "./storage";
import { DatasetMetadata } from "./metadataGenerator";
import { ProcessedSource } from "./sourceHandler"; // Import ProcessedSource interface

export async function runAgentWorkflow(query: string): Promise<void> {
  console.log(`Starting agent workflow for query: "${query}"`);

  // Level 2: Dataset Discovery (Search Engine Layer)
  const searchResults: SearchResult[] = await searchForDatasets(query);

  console.log(`Finished search. Found ${searchResults.length} potential sources.`);

  // Level 3: Source Handling & Level 4: Classification + Metadata Generation
  for (const result of searchResults) {
    const processedSource: ProcessedSource | null = await handleSource(result);
    
    // Level 5: Storage & Retrieval
    if (processedSource && processedSource.metadata) {
      await saveDataset(processedSource.metadata, processedSource.fileContent); // Pass metadata AND fileContent
    } else {
      console.log(`Skipping saving for ${result.url} due to no processing or metadata.`);
    }
  }

  console.log("Agent workflow completed.");
  // TODO: Add logic to trigger Level 4 and Level 5 here is not needed now
}

// Example usage (can be called from an API route or other trigger):
// runAgentWorkflow("Nigerian market prices").catch(console.error); 