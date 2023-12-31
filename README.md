# nextabase

Next.js 13 + Supabase + shadcn/ui starter template

## Features

- Next.js 13 App Directory
- shadcn/ui for component styling

## Usage

```bash
yarn
yarn supabase start
```

```bash
yarn supabase start
yarn dev
```

## Todo List

- [x] Add local development Supabase, with migrations folder
- [x] Add global Supabase user context
- [x] Add tailwind typography
- [x] Style registration, login, and password reset pages
- [x] Add auth functionality to auth pages
- [x] Add toast notifications for user interactions (incl darkmode)
- [x] Add user admin claims to Supabase migrations
- [x] Add user_metadata and app_metadata to Supabase User type
- [x] Add todo table with user_id foreign key
- [x] Add todo table RLS
- [x] Add todo page with CRUD operations
- [ ] Add dummy todo lists and users to seed.sql file
- [x] Add RLS for admins (view all todos)
- [ ] Add ability for admins to set user claims
- [x] Add tracking with Posthog

## License

Licensed under the [Apache 2.0 license](http://www.apache.org/licenses/).
