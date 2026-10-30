# DHUN Scalable Backend

Node.js + Express ES Modules + MongoDB + Redis + BullMQ + PM2. Docker is not required.

This is a production-oriented starter, not a guarantee of 100,000 RPM. Validate capacity using realistic staging tests before launch.

## Requirements
- Node.js 20+
- MongoDB and Redis running locally or remotely
- Cloudinary for audio and cover-image storage/delivery

## Run
1. Copy `.env.example` to `.env`; set a unique secret of at least 32 characters and Cloudinary credentials from the Cloudinary Console.
2. Run `npm install`.
3. Start MongoDB and Redis.
4. Run `npm run dev`.
5. Test `GET /api/v1/health/live` and `/api/v1/health/ready`.

## Endpoints
- POST `/api/v1/auth/signup`
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/logout`
- GET `/api/v1/auth/me`
- GET `/api/v1/songs?limit=20&cursor=...`
- GET `/api/v1/songs/:songId`
- GET `/api/v1/songs/:songId/playback`
- POST `/api/v1/songs/:songId/history`
- GET/POST `/api/v1/playlists`
- PATCH/DELETE `/api/v1/playlists/:id`
- POST `/api/v1/playlists/:id/tracks`
- DELETE `/api/v1/playlists/:id/tracks/:songId`
- GET `/api/v1/search?q=...`

## Notes before production
- Cookie authentication requires CSRF defenses for relevant deployment/client setups.
- Add email verification, password reset, refresh-token rotation/revocation and account abuse controls.
- Configure TLS, exact proxy trust, secret manager, backups/restore drills, log redaction, metrics, alerts and rollback.
- Audio assets are uploaded to Cloudinary using `resource_type: "video"` and authenticated delivery; cover art uses Cloudinary image assets. Do not stream audio through Express. Verify Cloudinary plan limits, supported formats, byte-range playback behavior, access-control configuration and delivery quota before production. The generated authenticated signed URL is not inherently time-limited.
- The history queue uses an event ID for duplicate protection; define durability/retention guarantees for your product.
- PM2 cluster mode scales on one host only. Use Nginx/cloud load balancer across multiple VMs.
- Test actual workload and measure p95/p99, errors, DB pools, Redis, queue lag, CPU, memory and CDN bandwidth.
