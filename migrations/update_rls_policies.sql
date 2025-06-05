-- Update RLS policies for the datasets storage bucket to allow file uploads

-- First, check if the policy already exists
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage' 
        AND policyname = 'Allow authenticated users to upload files to datasets bucket'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "Allow authenticated users to upload files to datasets bucket"
        ON storage.objects
        FOR INSERT
        TO authenticated
        WITH CHECK (bucket_id = 'datasets');
    END IF;
END
$$;

-- Also create a policy to allow public access to read files from the datasets bucket
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage' 
        AND policyname = 'Allow public access to read files from datasets bucket'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "Allow public access to read files from datasets bucket"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'datasets');
    END IF;
END
$$;

-- Create a policy to allow authenticated users to update their own files
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage' 
        AND policyname = 'Allow authenticated users to update their own files'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "Allow authenticated users to update their own files"
        ON storage.objects
        FOR UPDATE
        TO authenticated
        USING (bucket_id = 'datasets')
        WITH CHECK (bucket_id = 'datasets');
    END IF;
END
$$;

-- Create a policy to allow authenticated users to delete their own files
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage' 
        AND policyname = 'Allow authenticated users to delete their own files'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "Allow authenticated users to delete their own files"
        ON storage.objects
        FOR DELETE
        TO authenticated
        USING (bucket_id = 'datasets');
    END IF;
END
$$;

-- Create a policy to allow authenticated users to insert datasets
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'datasets' 
        AND schemaname = 'public' 
        AND policyname = 'Allow authenticated users to insert datasets'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "Allow authenticated users to insert datasets"
        ON datasets
        FOR INSERT
        TO authenticated
        WITH CHECK (true);
    END IF;
END
$$;

-- Create a policy to allow public access to read datasets
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'datasets' 
        AND schemaname = 'public' 
        AND policyname = 'Allow public access to read datasets'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "Allow public access to read datasets"
        ON datasets
        FOR SELECT
        TO public
        USING (true);
    END IF;
END
$$; 