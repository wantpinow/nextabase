CREATE TYPE auth_user as (
  id uuid, 
  email varchar,
  last_sign_in_at timestamptz,
  raw_user_meta_data jsonb,
  raw_app_meta_data jsonb
);
