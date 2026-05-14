create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text default 'inactive' check (subscription_status in ('active', 'inactive', 'trialing', 'past_due', 'canceled')),
  subscription_end_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Service role can do everything"
  on public.profiles for all
  using (true)
  with check (true);
