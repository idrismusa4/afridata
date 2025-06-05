-- Update the datasets table to include all fields needed for the dataset detail page
ALTER TABLE datasets
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS author_type TEXT,
ADD COLUMN IF NOT EXISTS size TEXT,
ADD COLUMN IF NOT EXISTS downloads INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS price TEXT,
ADD COLUMN IF NOT EXISTS rating NUMERIC(3,1),
ADD COLUMN IF NOT EXISTS reviews INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS license TEXT,
ADD COLUMN IF NOT EXISTS columns INTEGER,
ADD COLUMN IF NOT EXISTS rows INTEGER,
ADD COLUMN IF NOT EXISTS files JSONB;

-- Add indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_datasets_country ON datasets(country);
CREATE INDEX IF NOT EXISTS idx_datasets_tags ON datasets USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_datasets_ai_score ON datasets(ai_score);
CREATE INDEX IF NOT EXISTS idx_datasets_created_at ON datasets(created_at);

-- Update RLS policies to allow file uploads to the datasets storage bucket
-- Note: This is a placeholder. You'll need to run this in the Supabase SQL editor
-- or use the Supabase dashboard to update the RLS policies for the storage bucket.

-- Example RLS policy for the datasets storage bucket:
-- CREATE POLICY "Allow authenticated users to upload files to datasets bucket"
-- ON storage.objects
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'datasets');

-- Example RLS policy for the datasets table:
-- CREATE POLICY "Allow authenticated users to insert datasets"
-- ON datasets
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (true); 