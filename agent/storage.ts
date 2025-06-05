// This file handles storing dataset metadata in Supabase (Level 5).

import { DatasetMetadata } from "./metadataGenerator";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export async function saveDataset(
  metadata: DatasetMetadata,
  fileContent?: Buffer // Optional: content of the file for upload
): Promise<void> {
  console.log(`Attempting to save dataset metadata for: ${metadata.source_url}`);

  try {
    // Initialize Supabase client inside the function for Next.js v15 Server Component compatibility
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase URL and Anon Key are required.');
      // Depending on your needs, you might throw an error or handle this differently
      throw new Error('Missing Supabase environment variables.');
    }

    const supabase: SupabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey
    );

    // Use the source URL as the file URL to avoid storing files in our storage
    const fileUrl = metadata.source_url;
    console.log("Using original source URL as file URL:", fileUrl);

    // Prepare metadata for saving (excluding id as Supabase will generate one by default on insert
    // unless you are using the temporary id in a specific way, adjust as needed).
    // For this implementation, we will let Supabase generate the ID on insert
    // and potentially update the agent workflow to use the generated ID later.
    const { id, ...metadataWithoutId } = metadata; // Exclude the temporary ID

    // **IMPORTANT:** Replace 'datasets' with your actual Supabase database table name.
    console.log("Saving metadata to Supabase database...");
    const { data, error: dbError } = await supabase
      .from('datasets') // Replace with your table name
      .insert([{ ...metadataWithoutId, file_url: fileUrl }]); // Include the source URL as the file URL

    if (dbError) {
      console.error("Error saving metadata to Supabase database:", dbError);
      throw dbError; // Throw to indicate failure
    } else {
      console.log("Metadata saved successfully.", data);
      // TODO: If you need the Supabase-generated ID for further processing,
      // you would access it from `data` here and potentially return it.
    }

  } catch (error: any) {
    console.error(`Failed to save dataset for ${metadata.source_url}: ${error.message}`);
    // Handle the error appropriately (e.g., logging, retrying)
    throw error; // Re-throw or handle as needed
  }
}