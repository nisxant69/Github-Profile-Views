# GitHub Profile Views Counter

A simple and elegant profile views counter for your GitHub profile README, built with Vercel and Supabase. Features real-time counting, persistent storage, and beautiful Shield.io badges.

<p align="center">
  <img src="https://img.shields.io/badge/Profile%20Views-1.2k-blue?style=for-the-badge" alt="Profile Views Counter Demo"/>
</p>

## ✨ Features

- 🚀 Real-time view counting
- 💾 Persistent storage with Supabase
- 🎨 Customizable Shield.io badges
- ⚡ Fast and reliable with Vercel
- 🔒 No authentication required
- 🔄 Automatic updates every 5 seconds
- 📊 Works with GitHub README

## 🚀 Quick Setup

1. **Fork this repository**
   ```bash
   # Clone the repository
   git clone https://github.com/your-username/github-profile-views
   cd github-profile-views
   ```

2. **Set up Supabase**
   - Create account at [Supabase](https://supabase.com)
   - Create new project
   - Go to SQL Editor and run:
   ```sql
   -- Create the profile_views table
   CREATE TABLE profile_views (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       count INTEGER DEFAULT 0
   );

   -- Insert initial record with your starting count
   INSERT INTO profile_views (count) VALUES (0);

   -- Enable read write for anonymous users
   CREATE POLICY "Allow anonymous access"
   ON profile_views
   FOR ALL
   TO anon
   USING (true)
   WITH CHECK (true);

   -- Make sure RLS is enabled
   ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;
   ```

3. **Deploy to Vercel**
   - Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
   - Deploy to Vercel:
   ```bash
   vercel
   ```
   - Add these environment variables in Vercel:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_ANON_KEY`: Your Supabase anon key
     - `SUPABASE_TABLE`: "profile_views"

4. **Add to your GitHub Profile**
       
    <p align="center">
      <img src="https://img.shields.io/badge/Profile%20Views-1.26k-blue?style=for-the-badge" alt="Profile Views Counter Demo"/>
    </p>

  ```html
    <img src="https://img.shields.io/endpoint?url=https://github-profile-views-psi.vercel.app/api/views&style=for-the-badge" alt="Profile Views Counter Demo"/>
```


## 🛠️ Manual Setup

### Prerequisites
- Node.js
- npm/yarn
- Vercel account
- Supabase account

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local`:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_TABLE=profile_views
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## 🎨 Customization

### Badge Styles
You can customize the badge by adding Shield.io parameters:

- Change style:
  ```
  &style=for-the-badge
  &style=flat
  &style=plastic
  ```

- Change colors:
  ```
  &color=blue
  &color=green
  &color=red
  ```

Example:
```html
<img src="https://img.shields.io/endpoint?url=https://github-profile-views-psi.vercel.app/api/views&style=for-the-badge&color=blue" />
```

## 📝 How It Works

1. When someone views your profile, the Shield.io badge makes a request to your Vercel API
2. The API reads the current count from Supabase
3. Increments the count and saves it back
4. Returns the new count in Shield.io format
5. Shield.io renders the badge with the updated count

The counter includes:
- 5-second caching to prevent spam
- Error handling for reliable operation
- Atomic updates to prevent race conditions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



## 🔗 Links
- [Vercel](https://vercel.com) for hosting
- [Supabase](https://supabase.com) for database
- [Shields.io](https://shields.io) for badges
