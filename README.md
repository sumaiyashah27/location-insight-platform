# Location Insight Platform (Enterprise Mapping & Visualization)

**React + Redux + TypeScript + GraphQL + JWT + Docker + AWS-ready**

A secure, role-based analytics dashboard for location strategy. Interactive KPIs, 30-day trends, and region filters. GraphQL reduces over-fetching and improves data-fetch efficiency.

* **Performance:** ~90%	**Accessibility:** ~85%	**Reliability:** ~92%
* **RBAC:** Admin / Analyst / Viewer with JWT
* **One command** local dev (front + back) or single Docker container (serves UI + API)
* **AWS Elastic Beanstalk** deploy-ready (Docker)

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Screens](#screens)
* [Architecture](#architecture)
* [Repo Structure](#repo-structure)
* [Prerequisites](#prerequisites)
* [Quick Start (No Docker)](#quick-start-no-docker)
* [Run with Docker (One Container)](#run-with-docker-one-container)
* [Environment Variables](#environment-variables)
* [Default Credentials](#default-credentials)
* [API Endpoints](#api-endpoints)
* [AWS Deployment (Elastic Beanstalk, one command)](#aws-deployment-elastic-beanstalk-one-command)
* [Troubleshooting](#troubleshooting)
* [License](#license)

---

## Features

* 🔐 **JWT Auth + RBAC**: Admin, Analyst, Viewer
* 📊 **Dashboards**: KPIs (Performance, Accessibility, Reliability)
* 📊 **Analytics**: Line chart for 30-day trend; region filter (North/South)
* ⚡ **GraphQL**: one request for all dashboard data; Apollo Client caching
* 🧩 **Redux Toolkit**: global auth state & protected routes
* 🐳 **Dockerized**: single container serves React + GraphQL
* ☁️ **AWS-ready**: Elastic Beanstalk via `Dockerrun.aws.json`

---

## Tech Stack

* **Frontend:** React, TypeScript, Vite, Redux Toolkit, Recharts/Apollo Client
* **Backend:** Node.js, Express, Apollo Server (GraphQL), JWT, bcrypt
* **Infra:** Docker, AWS Elastic Beanstalk (ready)
* **Tooling:** Vite, npm, (optional) Jest/Testing Library

---

## Screens

* **Dashboard:** KPI cards + quick deltas
* **Analytics:** Line chart for 30-day trend; region filter
* **Settings:**

  * *Profile Settings* → all roles (profile + logout)
  * *System Settings* → **Admin only** (list/add/update/delete users)

---

## Architecture

```
[ React (Vite) ] — Redux — Apollo Client
          │
          ▼
   [ GraphQL / Apollo Server ]
          │
      JWT / RBAC
          │
   (Mock data layer; DB-pluggable)
```

**Prod-ready note:** data layer can be swapped to Prisma + Postgres/DynamoDB without touching UI.

---

## Repo Structure

```
location-insight-platform/
├─ client/                      # React + Vite + TS
│  ├─ src/
│  │  ├─ api/graphql/           # Apollo client, operations
│  │  ├─ app/                   # Redux store + slices
│  │  ├─ components/            # Charts (KPI, LineSeries)
│  │  ├─ pages/                 # Dashboard, Analytics, Settings
│  │  └─ routes/
│  └─ vite.config.ts, tsconfig.json, ...
├─ server/                      # Node + Apollo Server
│  ├─ src/
│  │  ├─ schema/
│  │  ├─ resolvers/
│  │  ├─ services/
│  │  ├─ data/
│  │  ├─ context.js, roles.js
│  │  └─ index.js               # serves /graphql and frontend / (public)
│  └─ package.json
├─ Dockerfile                   # builds client; serves via server/public
├─ .dockerignore
├─ Dockerrun.aws.json           # Elastic Beanstalk config
├─ package.json                 # root: starts client+server together
└─ README.md
```

---

## Prerequisites

* **Node.js 20+** and **npm**
* **Git**
* **(Optional) Docker Desktop**
* **(Optional) AWS CLI + EB CLI** (only if you’ll deploy now)

### Install Docker (if you want Docker run)

* Windows/Mac: install **Docker Desktop**
* Linux: install Docker Engine from your distro’s package manager
* After install: open a terminal and run `docker --version`

---

## Quick Start (No Docker)

> Works on Windows (PowerShell), macOS, Linux.

### 1) Clone

```bash
git clone https://github.com/sumaiyashah27/location-insight-platform.git
cd location-insight-platform
```

### 2) Install dependencies

```bash
# root tools (concurrently)
npm install

# server deps
cd server && npm install

# client deps
cd ../client && npm install

# back to root
cd ..
```

### 3) Environment variables

Create these files (don’t commit real secrets):

```
server/.env
client/.env
```

**server/.env**

```
PORT=4000
JWT_SECRET=change_me_please
NODE_ENV=development
```

**client/.env**

```
VITE_API_URL=http://localhost:4000/graphql
```

### 4) Run both (one command from root)

```bash
npm run start
```

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend:  [http://localhost:4000/graphql](http://localhost:4000/graphql)

> If you prefer two terminals: `cd server && npm run dev` and `cd client && npm run dev`.

---

## Run with Docker (One Container)

This builds the React app and serves it from the Node server. One port, one process.

```bash
# from repo root (where Dockerfile lives)
docker build -t location-insight-platform .
docker run -p 4000:4000 --env JWT_SECRET=change_me_please location-insight-platform
```

* App (UI): [http://localhost:4000](http://localhost:4000)
* GraphQL:   [http://localhost:4000/graphql](http://localhost:4000/graphql)

> If you see GraphQL but not the UI, ensure `server/src/index.js` serves `../public`:
>
> ```js
> app.use(express.static(path.join(__dirname, '../public')));
> app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
> ```

---

## Environment Variables

| Location      | Variable       | Example                         | Notes                         |
| ------------- | -------------- | ------------------------------- | ----------------------------- |
| `server/.env` | `PORT`         | `4000`                          | Server port                   |
| `server/.env` | `JWT_SECRET`   | `change_me_please`              | Set to a strong secret        |
| `client/.env` | `VITE_API_URL` | `http://localhost:4000/graphql` | GraphQL endpoint for frontend |

> In Docker/AWS, pass `JWT_SECRET` as an environment variable.

---

## Default Credentials

| Role    | Email                 | Password      |
| ------- | --------------------- | ------------- |
| Admin   | `admin@example.com`   | `Password123` |
| Analyst | `analyst@example.com` | `Password123` |
| Viewer  | `viewer@example.com`  | `Password123` |

* **Settings** page: all roles see Profile+Logout; **Admin** additionally sees User Management.
* Admin can **Add / Update Role / Delete** users in Settings → System Settings.

---

## API Endpoints

* **GraphQL Playground**: `GET/POST /graphql`
* Example query (Analytics):

```graphql
query {
  analytics(filter: { region: "North" }) {
    performance
    accessibility
    reliability
    kpis { label value delta }
    timeseries { date value region }
  }
}
```

* Auth (login):

```graphql
mutation {
  login(email: "admin@example.com", password: "Password123") {
    token
    user { id email role }
  }
}
```

Include `Authorization: Bearer <token>` header for admin-only queries (e.g., `users`).

---

## AWS Deployment (Elastic Beanstalk, one command)

> You can show this section in your interview; you don’t have to deploy right now.

**What’s included:**

* `Dockerfile` builds client + runs server (serves UI + GraphQL)
* `Dockerrun.aws.json` instructs EB to run container on port `4000`

### Steps (when you’re ready)

```bash
# Install EB CLI (Python/pip)
pip install --upgrade awsebcli

# Configure AWS credentials (one-time)
aws configure

# Initialize EB in this repo (choose region, platform "Docker")
eb init

# Create environment (first time)
eb create location-insight-env

# Deploy
eb deploy
```

When complete, you’ll get a URL like:
`http://location-insight-env.eba-xyz123.us-east-1.elasticbeanstalk.com/`

* UI: `/`
* API: `/graphql`

**Set env vars in EB console** → add `JWT_SECRET`.

---

## Troubleshooting

**Port 4000 already in use**

* Stop other processes on 4000 or change `PORT` in `server/.env` and rebuild Docker/run dev.

**Docker: UI not showing, GraphQL works**

* Check Express static paths (must be `../public` from `src`):

  ```js
  app.use(express.static(path.join(__dirname, '../public')));
  app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
  ```

**GraphQL “Unauthorized” / “Forbidden”**

* In Playground, set HTTP Headers:

  ```json
  { "Authorization": "Bearer <your-jwt>" }
  ```

  Get a token via the `login` mutation (use admin credentials).

**Vite `import.meta.env` TS error during Docker build**

* Ensure `client/src/vite-env.d.ts` exists:

  ```ts
  /// <reference types="vite/client" />
  ```

**“Cannot use import.meta outside a module” in browser console**

* Don’t use `import.meta` in runtime console. In code, only use `import.meta.env.VITE_*`.

---

## License

MIT © [sumaiyashah27](https://github.com/sumaiyashah27)

---
