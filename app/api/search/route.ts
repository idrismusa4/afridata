// This file defines the API route for triggering the AI agent workflow with a search query.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Sample data to return if no results are found in the database
const sampleDatasets = [
  {
    id: '1',
    title: 'Nigerian Market Price Index 2022',
    summary: 'This dataset contains monthly prices of consumer goods in Nigeria from Jan–Dec 2022, including food items, household goods, and services.',
    tags: ['Nigeria', 'Economy', 'Prices', 'Time Series'],
    source_url: 'https://nigerianbureau.gov.ng',
    file_url: 'https://example.com/datasets/nigeria-market-prices-2022.csv',
    file_type: 'CSV',
    country: 'nigeria',
    ai_score: 4.8,
    is_paid: false,
    author: 'Nigerian Bureau of Statistics',
    downloads: 1250,
    last_updated: '2022-12-31',
    rating: 4.5
  },
  {
    id: '2',
    title: 'Kenya Agriculture Production 2021',
    summary: 'Annual agricultural production data for Kenya, including crop yields, livestock numbers, and farming practices across different regions.',
    tags: ['Kenya', 'Agriculture', 'Production', 'Regional'],
    source_url: 'https://kenyaagriculture.gov.ke',
    file_url: 'https://example.com/datasets/kenya-agriculture-2021.xlsx',
    file_type: 'Excel',
    country: 'kenya',
    ai_score: 4.6,
    is_paid: false,
    author: 'Kenya Ministry of Agriculture',
    downloads: 980,
    last_updated: '2021-12-15',
    rating: 4.2
  },
  {
    id: '3',
    title: 'South African Economic Indicators 2023',
    summary: 'Quarterly economic indicators for South Africa, including GDP, inflation, employment, and trade statistics.',
    tags: ['South Africa', 'Economy', 'GDP', 'Inflation'],
    source_url: 'https://southafricastats.gov.za',
    file_url: 'https://example.com/datasets/south-africa-economy-2023.pdf',
    file_type: 'PDF',
    country: 'south-africa',
    ai_score: 4.7,
    is_paid: true,
    author: 'South African Reserve Bank',
    downloads: 750,
    last_updated: '2023-03-31',
    rating: 4.8
  }
];

// Function to check if the database is empty and insert sample data if needed
async function ensureSampleData(supabase: any) {
  try {
    // Check if the datasets table exists and has data
    const { data, error } = await supabase
      .from('datasets')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Error checking database:', error);
      return false;
    }
    
    // If no data exists, insert sample data
    if (!data || data.length === 0) {
      console.log('Database is empty, inserting sample data...');
      
      const { error: insertError } = await supabase
        .from('datasets')
        .insert(sampleDatasets);
      
      if (insertError) {
        console.error('Error inserting sample data:', insertError);
        return false;
      }
      
      console.log('Sample data inserted successfully');
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error in ensureSampleData:', error);
    return false;
  }
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ datasets: [], total: 0 });
    }

    // 1. Check Supabase for similar queries (title/tags/summary ilike)
    const { data: existing, error: searchError } = await supabase
      .from('datasets')
      .select('*')
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (searchError) {
      console.error('Supabase search error:', searchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (existing && existing.length > 0) {
      // Transform the data to match the expected format for the dataset details page
      const transformedData = existing.map(dataset => ({
        id: dataset.id,
        title: dataset.title,
        summary: dataset.summary,
        description: dataset.description || `This dataset contains information about ${dataset.title}.`,
        author: dataset.author || 'Unknown',
        authorType: dataset.author_type || 'Government',
        tags: dataset.tags || ['Unknown'],
        fileType: dataset.file_type || 'Unknown',
        size: dataset.size || 'Unknown',
        downloads: dataset.downloads || 0,
        views: dataset.views || 0,
        lastUpdated: dataset.last_updated || 'Recently',
        createdDate: dataset.created_date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isPaid: dataset.is_paid || false,
        price: dataset.price || '0',
        rating: dataset.rating || 4.0,
        reviews: dataset.reviews || 0,
        license: dataset.license || 'Creative Commons Attribution 4.0',
        columns: dataset.columns || 0,
        rows: dataset.rows || 0,
        files: dataset.files || [{ name: 'dataset_file', size: 'Unknown' }],
        source_url: dataset.source_url,
        file_url: dataset.file_url
      }));
      
      return NextResponse.json({ datasets: transformedData, total: transformedData.length });
    }

    // 2. If not found, call the agent
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const agentResponse = await fetch(`${baseUrl}/api/agent-new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!agentResponse.ok) {
      const err = await agentResponse.text();
      console.error('Agent error:', err);
      return NextResponse.json({ error: 'Agent error', detail: err }, { status: 500 });
    }

    const agentData = await agentResponse.json();
    
    // The agent data should already be in the correct format for the dataset details page
    return NextResponse.json({ datasets: agentData.datasets || [], total: (agentData.datasets || []).length });
  } catch (error) {
    console.error('Error in search route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Optional: Add a GET method if needed for fetching existing results, etc.
// export async function GET(request: Request) { /* ... */ } 