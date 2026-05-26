import { createClient } from "@supabase/supabase-js";
import { env } from "./env.server";

export type Venue = {
  id: string;
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
  const supabase = createClient(env.supabaseUrl, env.supabasePublishableKey);

  const { data, error } = await supabase
    .from("venues")
    .select("id, name, neighbourhood, address, postal_code, latitude, longitude, smoking_type, status")
    .eq("status", "approved")
    .order("name");

  if (error) {
    throw new Error(`Failed to fetch venues: ${error.message}`);
  }

  return data.map((venue) => ({
    id: venue.id,
    name: venue.name,
    neighbourhood: venue.neighbourhood,
    address: venue.address,
    postalCode: venue.postal_code,
    latitude: venue.latitude,
    longitude: venue.longitude,
    smokingType: venue.smoking_type,
    status: venue.status,
  }));
}
