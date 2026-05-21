-- Row Level Security policies

-- venues: anyone can read approved venues (public map data)
alter table venues enable row level security;

create policy "public can read approved venues"
  on venues
  for select
  using (status = 'approved');

-- proposals: no public access — managed via Supabase dashboard only
alter table proposals enable row level security;
