# user-service — Day 1 Skeleton

This is a **partial skeleton** of the User Service for the Food Delivery
Microservices capstone. Built so far (Day 1, steps 1–4 of the plan):

## Included
- `package.json` — ESM (`"type": "module"`), deps: express, prisma,
  bcrypt, jsonwebtoken, zod, dotenv, cors, helmet, morgan
- `prisma/schema.prisma` — `User` and `RefreshToken` models, `Role` enum
  (CUSTOMER, RESTAURANT_OWNER, DELIVERY_AGENT, ADMIN)
- `.env.example` — copy to `.env` and fill in real secrets before running
- `src/config/env.js` — loads and validates required env vars
- `src/config/db.js` — Prisma client singleton with connect/disconnect helpers
- `src/utils/ApiError.js` — custom error class with status-code helpers
- `src/utils/asyncHandler.js` — wraps async route handlers
- `src/utils/hash.js` — bcrypt hash/compare helpers
- `src/utils/jwt.js` — JWT sign/verify helpers (access + refresh)
- `.gitignore`

## NOT yet included (later steps)
- `src/validators/` — Zod schemas (auth, user)
- `src/services/` — token.service.js, auth.service.js, user.service.js
- `src/middleware/` — validate.js, authenticate.js, authorize.js, errorHandler.js
- `src/controllers/` — auth.controller.js, user.controller.js
- `src/routes/` — auth.routes.js, user.routes.js, index.js
- `src/events/publisher.js` — stubbed Kafka publisher
- `src/app.js` — Express app wiring
- `openapi.yaml`
- `Dockerfile`
- `tests/`

## Setup once dependencies are added
```bash
npm install
cp .env.example .env   # then fill in real values
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Folder placement
Unzip this `user-service/` folder into:
`food_delivery_microsrvcs/Food_Delivery_Platform_PolyglotMicroservices/services/`
