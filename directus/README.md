# Directus CMS Setup (Viyafilms)

This project provisions a Directus 10.x instance backed by Postgres, with persistent volumes for uploads, extensions, and database data.

## Run

From `directus/` run:

```sh
# Windows (PowerShell)
docker compose up -d
```

Directus will be available at `http://localhost:8055/`.

Admin credentials are set via environment variables in `docker-compose.yml`:
- `ADMIN_EMAIL`: `admin@viyafilms.com`
- `ADMIN_PASSWORD`: `admin123`

Update `KEY` and `SECRET` with strong values before deploying.

## CORS

CORS is enabled with `CORS_ENABLED: 'true'` and origin set to `https://viyafilms.com`. Add additional origins as needed.

## Collections

Create the following collections via the Directus Admin UI (Settings → Data Model). Suggested field types and relationships:

### galleries
- `title` (string)
- `slug` (string, unique)
- `description` (text)
- `cover_image` (file, relation to `directus_files`)
- `status` (string or enum: `draft`, `published`)

### images
- `title` (string)
- `image_file` (file, relation to `directus_files`)
- `gallery` (many-to-one relation → `galleries`)
- `sort_order` (integer)
- `metadata` (json)

### testimonials
- `name` (string)
- `content` (text)
- `wedding_date` (date)
- `featured` (boolean)

### contact_submissions
- `name` (string)
- `email` (string)
- `phone` (string)
- `message` (text)
- `wedding_date` (date)
- `status` (string: `new`, `replied`, `archived`)

## Optional: Schema Automation

Directus supports schema snapshots. After you configure collections once, you can export and version your schema:

```sh
# Inside the Directus container
npx directus schema snapshot ./schema.json
npx directus schema apply ./schema.json
```

You can store `schema.json` in this folder and apply it in new environments.

## Environment for Frontend

Expose the CMS URL to the Next.js app via `.env.local`:

```
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

Then use the Directus SDK in `lib/directus.ts` to fetch data.