-- Enquiry storage for meghrajexports.com
--
-- Why this exists: api/contact.js used to send one SMTP email and keep nothing.
-- If SMTP was down or misconfigured, the buyer got a 500 and the enquiry was gone
-- with no record that it ever happened. This table is the durable copy; email
-- becomes a notification rather than the only storage.
--
-- Apply with: supabase db push, or paste into the SQL editor in the Supabase dashboard.

create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  reference     text        not null unique,
  created_at    timestamptz not null default now(),

  -- Submitted by the buyer
  name          text        not null,
  email         text        not null,
  company       text,
  country       text,
  whatsapp      text,
  category      text,
  categories    text[],
  message       text        not null,

  -- Delivery outcomes, so a silent email failure is visible later
  notified_at   timestamptz,
  autoreply_at  timestamptz,
  delivery_error text,

  -- Simple pipeline state, enough until there is a reason for a real CRM
  status        text        not null default 'new'
                check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'spam')),
  notes         text,

  -- Request context, useful for spotting abuse and for attribution
  source_ip     text,
  user_agent    text,
  referer       text
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx     on public.enquiries (status);
create index if not exists enquiries_email_idx      on public.enquiries (lower(email));

-- Row Level Security on, with no policies: the anon and authenticated keys can
-- read and write nothing. Only the service role key — which lives in Vercel's
-- environment variables and never reaches the browser — bypasses RLS.
-- Do not add a permissive policy here. Enquiries contain buyer contact details.
alter table public.enquiries enable row level security;

comment on table  public.enquiries is 'Website enquiries from /contact. Written by api/contact.js using the service role key.';
comment on column public.enquiries.reference is 'Human-readable id quoted to the buyer in the auto-reply, e.g. MX-20260830-A7K2.';
comment on column public.enquiries.delivery_error is 'Set when the notification or auto-reply email failed. Non-null means follow up manually.';
