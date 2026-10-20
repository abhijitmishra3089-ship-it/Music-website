# SONORA — Frontend & Backend Project Blueprint

**Working name:** SONORA  
**Tagline:** *Your sound, anywhere.*  
**Project:** MERN music streaming app with offline downloads  
**Frontend:** React, Vite, Tailwind CSS, React Router, Redux Toolkit  
**Backend:** Node.js, Express, MongoDB, Redis (optional at first)  
**Offline storage:** IndexedDB + PWA service worker  
**Audio delivery:** Object storage + CDN  
**Deployment preference:** Start without a separately managed load balancer.

> Name availability is not checked. Before publishing commercially, check trademarks, domains, and social handles. Use only music you own, have licensed, or are authorized to distribute.

---

## 1. Product vision

SONORA lets users discover music, search tracks, create playlists, play songs online, and save eligible tracks for offline listening after connecting to the internet.

### MVP features
- Register, login, logout, and persistent sessions.
- Home page with featured tracks, albums, genres, and recently played music.
- Search and paginated catalog.
- Music player with play/pause, next/previous, seek, volume, queue, shuffle, and repeat.
- Create, edit, and delete personal playlists.
- Download eligible tracks for offline playback.
- Downloads page with progress, storage usage, and remove-download action.
- Responsive desktop and mobile layouts.
- PWA install support and an offline fallback screen.
- Basic playback history and admin endpoints for authorized catalog management.

## 2. UI direction

### Visual identity
- **Brand:** SONORA
- **Tagline:** Your sound, anywhere.
- **Theme:** Premium dark music dashboard.
- **Colors:** Near-black/charcoal base, electric-violet accents, small warm-amber highlights.
- **Cards:** Rounded artwork, subtle borders, restrained glow.
- **Typography:** Clean sans-serif, editorial headings, readable song metadata.
- **Motion:** Short transitions; avoid distracting animations.

### Desktop layout sketch

```text
┌────────────────┬───────────────────────────────────────┬──────────────────┐
│ SONORA         │ Search music, artists, albums...      │ NOW PLAYING      │
│                │                                       │                  │
│ Home           │ Your sound, anywhere.                 │ Album artwork    │
│ Discover       │ [Featured offline playlist]           │ Track title      │
│ Your Library   │ [Download for offline]                │ Artist           │
│ Downloads      │                                       │ Progress         │
│ Playlists      │ Made for your mood                    │ Queue            │
│                │ [Album] [Album] [Album] [Album]        │                  │
│                │ Recently played                       │                  │
│                │ [Track rows with play/download]        │                  │
├────────────────┴───────────────────────────────────────┴──────────────────┤
│ ◀◀  ▶  ▶▶     Current track ━━━━━━━━━━━━━━━     Volume     Offline status │
└───────────────────────────────────────────────────────────────────────────┘
```

### Pages
1. **Home** — featured playlists, genres, recent tracks, popular music.
2. **Discover** — search, filters, genres, artists, albums.
3. **Library** — saved albums, playlists, liked tracks.
4. **Downloads** — locally saved tracks, progress, storage status, remove action.
5. **Playlist details** — track list, play all, shuffle, add/remove tracks.
6. **Authentication** — login and registration.
7. **Settings** — profile, storage controls, logout.
8. **Admin (protected)** — manage metadata for authorized tracks.

### Reusable components
- `AppShell`, `Sidebar`, `Topbar`, `MobileNav`
- `FeaturedHero`, `GenreChips`, `AlbumCard`, `SongRow`
- `AudioPlayer`, `PlayerControls`, `ProgressBar`, `VolumeControl`
- `DownloadButton`, `DownloadProgress`, `OfflineBadge`
- `SearchBar`, `EmptyState`, `LoadingSkeleton`, `ErrorMessage`
- `PlaylistCard`, `CreatePlaylistModal`, `ConfirmDialog`

---

## 3. Technology stack

| Layer | Technology | Responsibility |
|---|---|---|
| UI | React + Vite | Component-based frontend |
| Styling | Tailwind CSS | Responsive design system |
| Routing | React Router | Page navigation |
| Global state | Redux Toolkit + React Redux | Auth, player, catalog UI, playlists, download status |
| API | Axios or Fetch | Backend requests |
| Offline audio | IndexedDB (for example, `idb`) | Store authorized audio blobs and metadata locally |
| PWA | Service worker + web app manifest | App-shell caching and installability |
| API server | Node.js + Express | Auth, catalog, playlists, download authorization |
| Database | MongoDB + Mongoose | Users, tracks, playlists, history |
| Cache/queues | Redis + BullMQ (optional initially) | Hot metadata cache, rate limits, background jobs |
| Audio storage | S3-compatible object storage | Store audio and artwork |
| Delivery | CDN | Efficient audio delivery |
| Testing | Vitest, Supertest, k6 | Unit, API, and load tests |

**State rule:** Redux should hold download IDs, progress, and player metadata—not large audio blobs. Store audio bytes in IndexedDB. Keep the actual `HTMLAudioElement` in a player service or React ref, not Redux state.

---

## 4. Suggested repository structure

```text
sonora/
├── client/
│   ├── public/
│   │   ├── icons/
│   │   ├── manifest.webmanifest
│   │   └── offline.html
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.js
│   │   │   └── hooks.js
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── music/
│   │   │   ├── player/
│   │   │   ├── downloads/
│   │   │   └── common/
│   │   ├── features/
│   │   │   ├── auth/authSlice.js
│   │   │   ├── songs/songsSlice.js
│   │   │   ├── player/playerSlice.js
│   │   │   ├── playlists/playlistsSlice.js
│   │   │   └── downloads/downloadsSlice.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Discover.jsx
│   │   │   ├── Library.jsx
│   │   │   ├── Downloads.jsx
│   │   │   ├── PlaylistDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/api.js
│   │   ├── db/offlineDB.js
│   │   ├── hooks/useOfflineAudio.js
│   │   ├── routes/AppRoutes.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── redis.js
│   │   │   └── storage.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Song.js
│   │   │   ├── Playlist.js
│   │   │   └── PlayHistory.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── jobs/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── docs/
│   └── API.md
├── .gitignore
└── README.md
```

---

## 5. Redux Toolkit state plan

### `authSlice`
- State: `user`, `isAuthenticated`, `status`, `error`
- Thunks/actions: `login`, `register`, `logout`, `loadCurrentUser`

### `songsSlice`
- State: `items`, `searchQuery`, `page`, `hasMore`, `status`
- Thunks/actions: `fetchSongs`, `searchSongs`, `fetchSongDetails`

### `playerSlice`
- State: `currentSong`, `queue`, `currentIndex`, `isPlaying`, `currentTime`, `duration`, `volume`, `shuffle`, `repeatMode`

### `playlistsSlice`
- State: `items`, `activePlaylist`, `status`

### `downloadsSlice`
- State: `downloadedSongIds`, `downloadProgressById`, `storageUsage`, `offlineReady`

Use Redux Toolkit async thunks or RTK Query for API data. Avoid duplicating the same server data in several slices without a clear reason.

---

## 6. Offline download and playback flow

### Download flow
1. User signs in and selects a track eligible for download.
2. Frontend requests download authorization from the API.
3. Backend checks authentication, track availability, and download rights.
4. Backend returns a short-lived signed storage URL or authorized download response.
5. Frontend downloads the file and stores the audio blob plus metadata in IndexedDB.
6. Redux updates download status and progress.
7. Downloads page shows the track as available offline.

### Playback flow
1. If the track is downloaded, read its blob from IndexedDB and play locally.
2. If it is not downloaded and the network is available, request an authorized playback URL.
3. If offline and the track is not stored locally, show “Not downloaded for offline playback”.
4. Handle interrupted downloads, storage quota errors, deleted files, and expired URLs gracefully.

### Browser limitations
- Request persistent storage when supported, but do not assume the browser will grant it.
- Show storage usage and allow users to remove downloads.
- Cache the app shell separately from audio files.
- Do not accidentally cache private API responses or signed URLs in the service worker.
- Browser PWAs have background playback and storage limitations; consider a native app if robust background playback is a core requirement.

---

## 7. Backend modules

### Authentication
- Register, login, logout, and current-user endpoint.
- Hash passwords with bcrypt or Argon2.
- Prefer secure HTTP-only cookies for browser sessions; configure `Secure`, `SameSite`, CORS, and CSRF protections for the deployment.
- Validate input and use generic login errors.

### Music catalog
- Paginated list, search, song details, artist/album metadata.
- Publish/unpublish status and authorized storage keys.
- Never return internal storage credentials or private secrets.

### Playback/download authorization
- Confirm the user can access the requested track.
- Issue short-lived signed URLs when supported by the storage provider.
- Apply per-user rate limits and audit suspicious download behavior.
- Avoid proxying every audio byte through Express unless required; direct storage/CDN delivery usually reduces API bandwidth.

### Playlists
- Create, list, update, and delete a user's playlists.
- Check ownership on every update/delete.
- For very large playlists, use a separate playlist-track collection instead of an unlimited embedded array.

### Background jobs (later phase)
- Aggregate playback events.
- Recalculate popular tracks.
- Clean up abandoned uploads.
- Send non-critical analytics to a queue instead of slowing playback requests.

---

## 8. Initial API contract

Prefix: `/api/v1`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Sign in |
| POST | `/auth/logout` | Sign out |
| GET | `/auth/me` | Current user |
| GET | `/songs` | Paginated catalog and filters |
| GET | `/songs/:songId` | Song details |
| GET | `/songs/:songId/playback` | Authorized playback URL |
| POST | `/songs/:songId/download` | Authorize an eligible download |
| GET | `/playlists` | Current user's playlists |
| POST | `/playlists` | Create playlist |
| GET | `/playlists/:playlistId` | Playlist details |
| PATCH | `/playlists/:playlistId` | Update playlist |
| DELETE | `/playlists/:playlistId` | Delete playlist |
| POST | `/history/events` | Record playback event |
| GET | `/health` | Health check |

Use validation, consistent error responses, pagination limits, and authorization checks on every private resource.

---

## 9. MongoDB data model outline

### User
- `name`
- `email` (unique index)
- `passwordHash`
- `role`
- `createdAt`

### Song
- `title`
- `artistName` or `artistId`
- `albumName` or `albumId`
- `durationSeconds`
- `storageKey`
- `coverKey`
- `isPublished`
- `downloadAllowed`
- `createdAt`

### Playlist
- `userId` (indexed)
- `name`
- `visibility`
- `createdAt`
- `updatedAt`

### PlaylistTrack (optional for larger playlists)
- `playlistId` (indexed)
- `songId`
- `position`

### PlayHistory
- `userId`
- `songId`
- `playedAt`
- `durationPlayed`

Add indexes based on actual query patterns and validate them with explain plans. Do not store large audio files in ordinary MongoDB documents.

---

## 10. Redis: when and why

Redis is useful but not required for the first local prototype.

Use it for:
- Caching popular song metadata with a short TTL.
- Shared rate-limit counters across API processes.
- BullMQ queues for analytics/background work.
- Socket.IO coordination only if realtime features and multiple instances are introduced.

Do not use Redis as the permanent database for users/playlists or as the primary audio store. Decide which features can safely fall back to MongoDB if Redis becomes unavailable.

---

## 11. Deployment without a separately managed load balancer

Initial deployment can use:
- Static frontend hosting/CDN.
- One public-facing Node.js API service.
- Managed MongoDB.
- Managed Redis (optional at first).
- Object storage and CDN for audio delivery.
- A separate worker process when background jobs become necessary.
- Centralized logs, error reporting, and uptime monitoring.

A hosting platform may internally route traffic even when you do not configure a separate load balancer yourself. One API machine still has CPU, memory, connection, and network limits. If you later add multiple API machines, traffic distribution and session/cache coordination become necessary.

**100,000 registered users is not the same as 100,000 simultaneous users.** Capacity cannot be promised from architecture alone. Load-test realistic journeys and measure API latency, error rate, database saturation, cache hit rate, and audio delivery separately before claiming a capacity target.

---

## 12. Security and reliability checklist

- [ ] Passwords hashed with bcrypt/Argon2.
- [ ] Secure cookies and CSRF strategy configured.
- [ ] CORS restricted to known frontend origins.
- [ ] Request body and query validation.
- [ ] Rate limits on authentication, search, playback, and download endpoints.
- [ ] Playlist ownership and role checks.
- [ ] Signed URLs kept short-lived and out of logs.
- [ ] Secrets stored in environment variables or a secret manager.
- [ ] MongoDB indexes and connection pooling reviewed.
- [ ] Redis secured with authentication/private networking in production.
- [ ] Database backups and restore procedure tested.
- [ ] Audio rights and download permissions verified.
- [ ] Error monitoring and structured logs enabled.
- [ ] API integration tests and browser offline tests added.
- [ ] Load tests run with realistic user journeys.

---

## 13. Development roadmap

### Phase 1 — Foundation
- Set up React/Vite/Tailwind and Express/MongoDB.
- Add routing, Redux store, shared layout, and environment configuration.
- Build authentication and protected routes.

### Phase 2 — Music experience
- Build catalog, search, song cards, playlists, and persistent player.
- Add loading, empty, and error states.
- Add pagination and database indexes.

### Phase 3 — Offline downloads
- Add IndexedDB wrapper and download progress.
- Save authorized audio locally.
- Implement offline detection, playback fallback, storage usage, and delete-download behavior.

### Phase 4 — Production hardening
- Add object storage/CDN signed URLs.
- Add Redis caching and rate limiting where useful.
- Add logs, metrics, backups, API tests, and load tests.
- Deploy and test on real mobile and desktop browsers.

---

## 14. Environment variable example

### `server/.env.example`

```dotenv
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sonora
REDIS_URL=redis://127.0.0.1:6379
CLIENT_URL=http://localhost:5173
SESSION_SECRET=replace_with_a_long_random_secret
AUDIO_STORAGE_BUCKET=
AUDIO_STORAGE_REGION=
AUDIO_STORAGE_ENDPOINT=
AUDIO_STORAGE_ACCESS_KEY_ID=
AUDIO_STORAGE_SECRET_ACCESS_KEY=
```

Use a secret manager or secure deployment environment for production secrets. Never commit `.env` or expose storage credentials to the browser.

---

## 15. MVP definition of done

- [ ] A user can register and log in.
- [ ] Home page loads published demo/authorized tracks.
- [ ] Search and pagination work.
- [ ] A track can be played online.
- [ ] A user can create and edit their own playlist.
- [ ] An eligible track can be downloaded and then played in airplane mode.
- [ ] Undownloaded tracks show a useful offline message.
- [ ] Refreshing the app restores safe session and player metadata.
- [ ] API validation and authorization tests pass.
- [ ] README explains setup, environment variables, music licensing assumptions, and known limitations.

**This document is a project blueprint, not a claim that the app is already implemented or verified for 100,000 concurrent users.**
