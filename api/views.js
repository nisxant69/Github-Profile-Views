import { createClient } from '@supabase/supabase-js';

// Environment variables and constants
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const TABLE = process.env.SUPABASE_TABLE;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Shield.io badge configurations
const createBadge = (count, color = 'brightgreen') => ({
  schemaVersion: 1,
  label: "profile views",
  message: count.toString(),
  color
});

const errorBadge = createBadge('error', 'red');

// SQL function to atomically increment and return count
const createIncrementFunction = `
  CREATE OR REPLACE FUNCTION increment_profile_views()
  RETURNS TABLE (id uuid, count integer) 
  LANGUAGE plpgsql
  AS $$
  DECLARE
    result record;
  BEGIN
    UPDATE ${TABLE}
    SET count = count + 1
    RETURNING id, count INTO result;
    
    RETURN QUERY SELECT result.id, result.count;
  END;
  $$;
`;

export default async function handler(request, response) {
  // Set CORS and caching headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');

  try {
    // Validate environment variables
    if (!SUPABASE_URL || !SUPABASE_KEY || !TABLE) {
      console.error('Missing environment variables');
      throw new Error('Configuration error');
    }

    // Get the first row (we only have one row in the table)
    let { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Database select error:', error);
      throw error;
    }

    if (!data) {
      console.error('No data found in table');
      throw new Error('No data found');
    }

    // Increment the count
    const newCount = (data.count || 0) + 1;
    
    // Update the count
    const { error: updateError } = await supabase
      .from(TABLE)
      .update({ count: newCount })
      .eq('id', data.id);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw updateError;
    }

    // Return the badge configuration
    return response.status(200).json(createBadge(newCount));

  } catch (error) {
    console.error('Handler error:', error);
    return response.status(500).json(errorBadge);
  }
} 