# Database Migrations

This directory contains SQL migration scripts for updating the Supabase database schema.

## How to Apply Migrations

### Option 1: Using the Supabase Dashboard

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of the migration script
4. Paste it into the SQL Editor
5. Click "Run" to execute the script

### Option 2: Using the Supabase CLI

If you have the Supabase CLI installed, you can run:

```bash
supabase db push
```

## Migration Scripts

### update_datasets_table.sql

This script updates the `datasets` table to include all fields needed for the dataset detail page:

- Adds new columns: description, author, author_type, size, downloads, views, last_updated, is_paid, price, rating, reviews, license, columns, rows, files
- Creates indexes for commonly queried fields
- Includes example RLS policies for the datasets storage bucket and table

## RLS Policies

The migration script includes example RLS policies for the datasets storage bucket and table. You'll need to uncomment and modify these policies to match your specific requirements.

### For the datasets storage bucket:

```sql
CREATE POLICY "Allow authenticated users to upload files to datasets bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'datasets');
```

### For the datasets table:

```sql
CREATE POLICY "Allow authenticated users to insert datasets"
ON datasets
FOR INSERT
TO authenticated
WITH CHECK (true);
```

## Troubleshooting

If you encounter any issues with the migration, check the following:

1. Make sure you have the necessary permissions to alter tables and create policies
2. Check the Supabase logs for any error messages
3. If you're using the Supabase CLI, make sure it's up to date 