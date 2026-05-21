import { createClient } from "@supabase/supabase-js";

export type Venue = {
  name: string;
  neighbourhood: string;
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  smokingType: "nonsmo" | "sepnonsmo" | "sepsmo";
  status: string;
};

export async function getVenues(): Promise<Venue[]> {
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set");
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  const { data, error } = await supabase
    .from("venues")
    .select("name, neighbourhood, address, postal_code, latitude, longitude, smoking_type, status")
    .eq("status", "approved")
    .order("name");

  if (error) {
    throw new Error(`Failed to fetch venues: ${error.message}`);
  }

  return data.map((r) => ({
    name: r.name,
    neighbourhood: r.neighbourhood,
    address: r.address,
    postalCode: r.postal_code,
    latitude: r.latitude,
    longitude: r.longitude,
    smokingType: r.smoking_type,
    status: r.status,
  }));
}
