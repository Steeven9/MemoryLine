# MemoryLine

[![License](https://img.shields.io/github/license/steeven9/MemoryLine)](/LICENSE)
[![Pipeline](https://github.com/steeven9/MemoryLine/actions/workflows/docker-image.yml/badge.svg)](https://github.com/steeven9/MemoryLine/actions/workflows/docker-image.yml)

## ℹ️ Description

This is a website to track important dates in a simple way.

The frontend is exposed at <https://dates.soulsbros.ch>.

### Dependencies

- **PostgreSQL database** to store data

## 🏡 Local development

### ⚙️ Prerequisites

- Node.js
- Yarn package manager
- Docker (if you want to run PostgreSQL locally)

### 🔧 Installation

```bash
# install dependencies
yarn install

# bootstrap local configuration
cp .env.example .env.local
```

Then after adapting the values in the `.env.local` file, you can set up the DB:

```bash
DATABASE_URL="${DATABASE_URL}" npx drizzle-kit push
```

### 🚀 Run locally

```bash
# start DB
docker-compose up postgresql -d

# start frontend
yarn dev
```

Finally, open your browser and head to <http://localhost:3000>

## ♻️ Contributing

If you spot a bug or think there's a missing feature, feel free to open an issue on our GitHub page!

Before submitting a pull request, please check that the build is still passing even after the changes:

```bash
yarn build
```
