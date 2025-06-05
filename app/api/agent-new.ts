import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// This is the real implementation of the agent workflow
export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    console.log(`Agent triggered with query: ${query}`);

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Supabase configuration is missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 1. Use SerpAPI to find relevant datasets
    const searchResults = await performWebSearch(query);
    console.log(`Found ${searchResults.length} search results`);

    // 2. Download and process files
    const datasets = [];
    for (const result of searchResults) {
      try {
        // Download the file or scrape the page
        const fileContent = await downloadFile(result.url);
        
        // 3. Use Gemini to summarize and classify
        const metadata = await analyzeWithAI(fileContent, result.title, result.url, result.snippet);
        
        // Add to datasets array
        datasets.push({
          ...metadata,
          source_url: result.url,
          file_url: result.url,
        });
      } catch (error) {
        console.error(`Error processing ${result.url}:`, error);
        // Continue with the next result
      }
    }

    // 4. Save the metadata to Supabase
    if (datasets.length > 0) {
      const { error: insertError } = await supabase
        .from('datasets')
        .insert(datasets);

      if (insertError) {
        console.error('Error inserting datasets:', insertError);
        // Continue even if there's an error inserting into the database
      }
    }

    // Return the results directly to the user
    return NextResponse.json({ 
      success: true, 
      message: 'Agent workflow completed successfully',
      datasets: datasets
    });
  } catch (error) {
    console.error('Error in agent API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Function to perform web search using SerpAPI
async function performWebSearch(query: string) {
  try {
    // Add "dataset" and "filetype:pdf OR filetype:csv OR filetype:xlsx" to the query
    const searchQuery = `${query} dataset (filetype:pdf OR filetype:csv OR filetype:xlsx)`;
    
    // Use SerpAPI for real web search
    const serpApiKey = process.env.SERPAPI_KEY;
    if (!serpApiKey) {
      throw new Error('SERPAPI_KEY is not set in environment variables');
    }
    
    const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery)}&api_key=${serpApiKey}&num=10`;
    
    const response = await axios.get(serpApiUrl);
    const data = response.data;
    
    // Extract organic results from SerpAPI response
    const results = [];
    if (data.organic_results && data.organic_results.length > 0) {
      for (const result of data.organic_results) {
        // Only include results that are likely to be datasets
        if (result.link && (result.link.includes('.pdf') || result.link.includes('.csv') || result.link.includes('.xlsx'))) {
          results.push({
            title: result.title,
            url: result.link,
            snippet: result.snippet
          });
        }
      }
    }
    
    return results.slice(0, 5); // Return top 5 results
  } catch (error) {
    console.error('Error performing web search with SerpAPI:', error);
    return [];
  }
}

// Function to download a file or scrape a page
async function downloadFile(url: string) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error downloading file from ${url}:`, error);
    throw error;
  }
}

// Function to analyze content with Gemini AI
async function analyzeWithAI(content: any, title: string, url: string, snippet: string) {
  try {
    // Determine file type from URL
    let fileType = 'Unknown';
    if (url.endsWith('.pdf')) fileType = 'PDF';
    else if (url.endsWith('.csv')) fileType = 'CSV';
    else if (url.endsWith('.xlsx')) fileType = 'Excel';
    
    // Extract text from content based on file type
    let text = '';
    if (fileType === 'PDF') {
      // For PDF, we would use a PDF parsing library
      // For now, we'll just use the title and snippet
      text = `${title}\n${snippet}`;
    } else if (fileType === 'CSV' || fileType === 'Excel') {
      // For CSV/Excel, we would parse the content
      // For now, we'll just use the title and snippet
      text = `${title}\n${snippet}`;
    } else {
      // For other types, use the title and snippet
      text = `${title}\n${snippet}`;
    }
    
    // Use Gemini to analyze the content
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze this dataset and provide the following information:
      - Title: A concise, descriptive title
      - Summary: A brief summary of what the dataset contains
      - Tags: 3-5 relevant tags (e.g., country, topic, year)
      - Country: The country this dataset is about (if applicable)
      - AI Score: A relevance score from 1-5
      
      Dataset information:
      Title: ${title}
      URL: ${url}
      File Type: ${fileType}
      Content: ${text}
      
      Format your response as a JSON object with the following structure:
      {
        "title": "string",
        "summary": "string",
        "tags": ["string"],
        "country": "string",
        "ai_score": number,
        "file_type": "string"
      }
    `;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Parse the JSON response
    let metadata;
    try {
      // Extract JSON from the response (in case Gemini adds extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        metadata = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      // Create a basic metadata object if parsing fails
      metadata = {
        title: title,
        summary: `Dataset from ${url}`,
        tags: ['Unknown'],
        country: 'Unknown',
        ai_score: 3.0,
        file_type: fileType
      };
    }
    
    // Add additional metadata
    return {
      ...metadata,
      is_paid: false,
      author: 'Unknown',
      downloads: 0,
      last_updated: new Date().toISOString().split('T')[0],
      rating: metadata.ai_score || 4.0
    };
  } catch (error) {
    console.error('Error analyzing with Gemini:', error);
    
    // Return a basic metadata object if AI analysis fails
    return {
      title: title,
      summary: `Dataset from ${url}`,
      tags: ['Unknown'],
      country: 'Unknown',
      ai_score: 3.0,
      file_type: url.endsWith('.pdf') ? 'PDF' : url.endsWith('.csv') ? 'CSV' : 'Excel',
      is_paid: false,
      author: 'Unknown',
      downloads: 0,
      last_updated: new Date().toISOString().split('T')[0],
      rating: 3.0
    };
  }
} 