## Install dependencies
**make sure your have pnpm installed**
```
pnpm install
```

## Test
```
pnpm dev
```

## To start Python server
Go to server directory and run python3 app.py.

## Database
Data is stored in a postgreSQL databse, created by docker-compose.yml. The container mounts the api/data folder serving as a persistent volume which also includes the credential. 

## ORM
Originally started with Prisma since it allows speedy development, but it doesn't seem scalable. So I decided to stick with the traditional TypeORM. In the future, depending on the growth of Drizzle, I might migrate to Drizzle instead.

## Backend
Project used NestJS since it works best with TypeORM. NestJS is one of the most popular backend framework. It works very well with pnpm and it supports TypeScript, effectively avoiding problems. The only issue is that it takes some effort to set up.