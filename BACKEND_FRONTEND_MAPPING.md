# Frontend ↔ Backend Mapping

Refactor ini mengikuti dokumen `Backend_ElderCareAI_Final.pdf` yang menetapkan Express API sebagai satu-satunya API yang dipanggil client.

## Auth
- Login: `POST /auth/login`
- Refresh: `POST /auth/refresh`
- Logout: `POST /auth/logout`
- Register: `POST /auth/register`
- Current user: `GET /me`
- Update profile: `PATCH /me`
- Forgot/reset password: `/auth/forgot-password`, `/auth/reset-password`

Frontend tidak lagi membuat JWT sendiri dan tidak lagi memakai Route Handler Next.js sebagai backend.

## Monitoring
- Daftar lansia: `GET /elders`
- Ringkasan: `GET /elders/:id/summary`
- Vitals: `GET /elders/:id/vitals?from=&to=`
- History: `GET /elders/:id/history`
- Realtime: `GET /elders/:id/stream` (SSE)

## Devices
- `GET /devices`
- `POST /devices/wearables`
- `POST /devices/cameras`
- `POST /devices/:id/pair`

UI tidak lagi mengubah status perangkat secara lokal. Status berasal dari backend (`status`, `battery`, `last_seen`).

## Access
- `GET /elders/:id/access-grants`
- `POST /elders/:id/access-grants`
- `DELETE /elders/:id/access-grants` dengan `grantId` pada body.

## Notifications
- `GET /notifications`
- `GET/PUT /me/notification-preferences`
- `POST /me/push-tokens`

## Admin
- `GET/POST /users`
- `PATCH/DELETE /users/:id`
- `GET /health`

## Alert
- `PATCH /alerts/:id`
- `PATCH /falls/:id/confirm`

## AI boundary
Browser **tidak** memanggil Flask AI service secara langsung. Endpoint seperti `/infer/pose`, `/infer/sensor`, dan `/baseline/*` adalah internal service yang dipanggil Express/worker sesuai rancangan backend.

## Important contract note
Dokumen backend yang diberikan adalah **rancangan/target API**, bukan source code Express yang sebenarnya. Karena itu service frontend memakai normalizer yang menerima beberapa kemungkinan nama field (`camelCase` dan nama SQL/Indonesia) untuk mengurangi coupling. Jika source backend final memiliki response/request schema yang berbeda dari rancangan PDF, penyesuaian berikutnya sebaiknya dilakukan terhadap OpenAPI/Swagger backend final.
