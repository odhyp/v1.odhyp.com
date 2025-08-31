+++
# Metadata
title = "Wedding Invitation"
description = "A simple and elegant wedding invitation website" 
slug = "wedding-invitation"
date = 2025-08-03T10:51:24+07:00
lastmod = 2025-08-03T20:15:00+07:00
draft = false

# Page setting
toc = true
featured = false
project_type = "other" # main or other
cover = "/images/2024-06-30/wedding-invitation-cover.webp"

# Taxonomies & Routing
tech_stacks = ["Hugo", "TailwindCSS", "JavaScript", "Python", "TypeScript", "Supabase", "Vercel"]
aliases = ["/wedding-invitation"]
+++

Simple, elegant, and customizable digital wedding invitation built with Hugo, TailwindCSS, and Supabase. It allows couples to create shareable, personalized invitation links for their guests, complete with RSVP tracking and a clean, minimal interface.

{{< wrapper class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8" >}}
{{< cta href="https://github.com/odhyp/wedding-invitation" icon="github" text="View Repository" >}}
{{< cta href="https://odhy-wedding-invitation.vercel.app/john_doe" group="material-symbols" icon="markunread-mailbox-rounded" text="Open Invitation" >}}
{{< /wrapper >}}

## Features

- Custom guest links for a personal invitation experience
- RSVP tracking powered by Supabase
- Clean, responsive design using TailwindCSS
- Simple guest management via `guest.txt`
- Static frontend with optional dynamic backend
- Easy deployment to Vercel or Cloudflare Pages
- Open source and fully customizable

## Installation

### Frontend

1. Clone the Repository and navigate to the project directory:

   ```bash
   git clone https://github.com/odhyp/wedding-invitation.git && cd wedding-invitation
   ```

2. Install Frontend Dependencies:

   ```bash
   cd frontend && npm install
   ```

3. Fill `data/guest.txt` with guests name in each line
4. Run `main.py`

   ```bash
   python main.py
   ```

5. Voila! You can share the link to your guests using

   ```html
   https://your-site.com/guest_name
   ```

### Backend

1. To set up the Backend, create a new Supabase project
2. Navigate to backend directory and create a `.env` file with your credentials:

   ```bash
   cd backend
   ```

   ```bash
   SUPABASE_PASS=<Your_Supabase_Password>
   DATABASE_URL=<Your_Connection_Pooling_URL>
   DIRECT_URL=<Your_Direct_Connection_URL>
   ```

## License

Distributed under the MIT License. See [LICENSE](https://github.com/odhyp/wedding-invitation/blob/master/LICENSE) for more information.

## Acknowledgments

- [Anggi Permata](https://www.instagram.com/psychoctator/) - Layout and Design
- [Firdig Alfalakhi](https://alfalakhi.catco.uno/) - Wishes API (Backend)
