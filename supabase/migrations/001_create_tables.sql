-- venues: the live, approved bar dataset
create table venues (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  neighbourhood text        not null,
  address       text        not null,
  postal_code   text        not null,
  latitude      float8      not null,
  longitude     float8      not null,
  smoking_type  text        not null check (smoking_type in ('nonsmo', 'sepnonsmo', 'sepsmo')),
  status        text        not null default 'approved' check (status in ('approved', 'pending', 'rejected')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- proposals: user-submitted bar suggestions awaiting review
create table proposals (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  neighbourhood text,
  address       text        not null,
  postal_code   text,
  latitude      float8,
  longitude     float8,
  smoking_type  text        check (smoking_type in ('nonsmo', 'sepnonsmo', 'sepsmo')),
  status        text        not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  submitted_by  text,
  notes         text,
  created_at    timestamptz not null default now()
);

-- keep updated_at current on every venues row change
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger venues_set_updated_at
  before update on venues
  for each row execute function set_updated_at();
