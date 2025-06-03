// This file will handle the processing of search results based on their source type (PDF, CSV, Web, etc.).

import { SearchResult } from "./search";
import { scrapePage } from "./scraper";
import { generateMetadata, DatasetMetadata } from "./metadataGenerator";
import axios from 'axios'; // Import axios for downloading files
import PDFParse from 'pdf-parse'; // Import pdf-parse for PDF text extraction
import { parse } from 'csv-parse'; // Import the CSV parse function
import AdmZip from 'adm-zip'; // Import adm-zip for ZIP file handling

interface ProcessedSource {
  metadata: DatasetMetadata;
  fileContent?: Buffer; // Include file content for types like PDF, CSV, ZIP
}

export async function handleSource(searchResult: SearchResult): Promise<ProcessedSource | null> {
  console.log(`Handling source: ${searchResult.url}`);

  // Basic file type detection based on URL extension
  const url = searchResult.url.toLowerCase();
  let fileType: 'PDF' | 'CSV' | 'Web' | 'ZIP' | 'Unknown' = 'Unknown';

  if (url.endsWith('.pdf')) {
    fileType = 'PDF';
  } else if (url.endsWith('.csv')) {
    fileType = 'CSV';
  } else if (url.endsWith('.zip')) {
    fileType = 'ZIP';
  } else if (url.startsWith('http') || url.startsWith('https')) {
     // This is a basic assumption; more robust checks might be needed
    fileType = 'Web';
  }

  console.log(`Detected file type: ${fileType}`);

  let extractedContent: string = "";
  let fileContent: Buffer | undefined = undefined; // Variable to hold file buffer

  switch (fileType) {
    case 'PDF':
      console.log("Handling PDF: Downloading and extracting text...");
      try {
        const response = await axios.get(searchResult.url, { responseType: 'arraybuffer' });
        fileContent = Buffer.from(response.data); // Store the PDF buffer
        const pdfData = await PDFParse(fileContent);
        extractedContent = pdfData.text; // Extract text from PDF
        console.log("PDF text extracted successfully.");
      } catch (error: any) {
        console.error(`Error handling PDF ${searchResult.url}: ${error.message}`);
        return null; // Return null if PDF handling fails
      }
      break;
    case 'CSV':
      console.log("Handling CSV: Downloading and inspecting content...");
      try {
        const response = await axios.get(searchResult.url, { responseType: 'text' });
        const csvContentString = response.data;
        // We need to convert the string to a Buffer to be consistent for saving
        fileContent = Buffer.from(csvContentString);

        // Parse a limited number of rows to get headers and a sample of data
        const records: any[] = await new Promise((resolve, reject) => {
          parse(csvContentString, { columns: true, trim: true, rtrim: true, ltrim: true, on_record: (record, {lines}) => { 
            // Limit the number of records parsed for content extraction
            if (lines > 10) return null; // Parse header + 10 data rows
            return record; 
          }},
          (err, output) => {
            if (err) reject(err);
            else resolve(output);
          });
        });

        if (records.length > 0) {
          // Use headers and a few rows as content for AI to summarize/classify
          const headers = Object.keys(records[0]).join(', ');
          const sampleRows = records.slice(0, 5).map(row => Object.values(row).join(', ')).join('\n');
          extractedContent = `CSV Headers: ${headers}\n\nSample Rows:\n${sampleRows}`;          
          console.log("CSV content inspected successfully.");
        } else {
           extractedContent = "CSV file is empty or could not be parsed.";
           console.log("CSV file is empty or could not be parsed.");
        }

      } catch (error: any) {
        console.error(`Error handling CSV ${searchResult.url}: ${error.message}`);
        return null; // Return null if CSV handling fails
      }
      break;
    case 'ZIP':
      console.log("Handling ZIP: Downloading and inspecting contents...");
      try {
        const response = await axios.get(searchResult.url, { responseType: 'arraybuffer' });
        fileContent = Buffer.from(response.data); // Store the ZIP buffer

        const zip = new AdmZip(fileContent);
        const zipEntries = zip.getEntries(); // get all entries

        let zipContentSummary = "Files in ZIP archive:\n";
        let textFileContent = "";

        for (const zipEntry of zipEntries) {
          console.log(zipEntry.entryName);
          zipContentSummary += `- ${zipEntry.entryName}\n`;

          // Attempt to extract content from small text-like files within the zip
          if (!zipEntry.isDirectory && zipEntry.entryName.toLowerCase().match(/\.(txt|csv|md|json)$/)) {
             try {
               const entryText = zip.readAsText(zipEntry); // Read entry as text
               textFileContent += `--- Content from ${zipEntry.entryName} ---\n${entryText.substring(0, 500)}...\n\n`; // Limit content to avoid large extractions
             } catch (entryError: any) {
                console.error(`Error reading zip entry ${zipEntry.entryName}: ${entryError.message}`);
             }
          }
        }
        extractedContent = zipContentSummary + textFileContent;
        console.log("ZIP contents inspected successfully.");

      } catch (error: any) {
        console.error(`Error handling ZIP ${searchResult.url}: ${error.message}`);
        return null; // Return null if ZIP handling fails
      }
      break;
    case 'Web':
      console.log("Handling Web Page: Scraping and summarizing relevant data...");
       const $ = await scrapePage(searchResult.url);
       if ($) {
         const pageTitle = $('title').text();
         const bodyText = $('body').text();
         // A more sophisticated approach would analyze the page structure to find relevant data sections.
         // For now, take a portion of the text content.
         extractedContent = `Title: ${pageTitle}\n\n${bodyText.substring(0, 1000)}...`; // Take first 1000 chars
         console.log(`Scraped title: ${pageTitle}`);
       } else {
          console.log(`Failed to scrape web page ${searchResult.url}`);
          return null; // Return null if scraping fails
       }
      break;
    case 'Unknown':
      console.log("// TODO: Handle unknown file types or log/skip");
      return null; // Skip processing for unknown types for now
  }

  // Level 4: Classification + Metadata Generation
  if (extractedContent) {
    const metadata = await generateMetadata(
      extractedContent,
      fileType as 'PDF' | 'CSV' | 'Web' | 'ZIP', // Cast to valid file types for metadata
      searchResult.url // Pass the original source URL
    );

    if (metadata) {
      // Return both metadata and file content (if available)
      return { metadata, fileContent };
    } else {
       console.log(`Metadata generation failed for ${searchResult.url}. Skipping save.`);
       return null;
    }
  } else {
    console.log(`No content extracted from ${searchResult.url}. Skipping metadata generation and save.`);
    return null;
  }
}

// Placeholder functions for specific file type handling (to be implemented later)
// async function downloadAndProcessPdf(url: string): Promise<any> { /* ... */ }
// async function inspectAndProcessCsv(url: string): Promise<any> { /* ... */ }
// async function downloadAndProcessZip(url: string): Promise<any> { /* ... */ }
// async function scrapeAndProcessWebPage(searchResult: SearchResult): Promise<any> { /* ... */ } 